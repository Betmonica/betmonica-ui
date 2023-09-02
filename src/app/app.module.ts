import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ToastrModule } from 'ngx-toastr';

/** STATES **/
import { UserState } from './store/states/user.state';
import { MatchesState } from './store/states/matches.state';
import { BetsState } from './store/states/bets.state';

/** COMPONENTS **/
import { AppComponent } from './app.component';

/** MODULES **/
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

/** INTERCEPTORS **/
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

/** Environment **/
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		SharedModule,
		NgxsModule.forRoot([UserState, MatchesState, BetsState], {
			developmentMode: !environment.production
		}),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxSmartModalModule.forRoot(),
		ToastrModule.forRoot({
			titleClass: 'toastr-title',
			messageClass: 'toastr-message',
			positionClass: 'toast-bottom-right',
			preventDuplicates: true
		}),
		BrowserAnimationsModule,
		DragScrollModule
	],

	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoaderInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
