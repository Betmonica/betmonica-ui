import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxSmartModalModule } from 'ngx-smart-modal';

/** STATES **/
import { UserState } from './store/states/user.state';
import { MatchesState } from './store/states/matches.state';

/** COMPONENTS **/
import { AppComponent } from './app.component';

/** MODULES **/
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

/** Environment **/
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxsModule.forRoot([UserState, MatchesState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxSmartModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
