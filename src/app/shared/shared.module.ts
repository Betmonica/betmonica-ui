import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DragScrollModule } from 'ngx-drag-scroll';

/** PAGES **/
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';

/** COMPONENTS **/
import { HeaderComponent } from './components/header/header.component';
import { MatchRowsComponent } from './components/match-rows/match-rows.component';
import { MatchRowComponent } from './components/match-rows/match-row/match-row.component';
import { MatchCardsComponent } from './components/match-cards/match-cards.component';
import { MatchCardComponent } from './components/match-cards/match-card/match-card.component';
import { ButtonComponent } from './components/button/button.component';
import { BetTabsComponent } from './components/bet-tabs/bet-tabs.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { LoaderComponent } from './components/loader/loader.component';

/** MODALS **/
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegistrationModalComponent } from './modals/registration-modal/registration-modal.component';
import { PlaceBetModalComponent } from './modals/place-bet-modal/place-bet-modal.component';
import { BetsPageComponent } from './pages/bets-page/bets-page.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MatchBetsComponent } from './components/match-bets/match-bets.component';
import { MatchBetComponent } from './components/match-bets/match-bet/match-bet.component';
import { BetsStatisticComponent } from './components/bets-statistic/bets-statistic.component';

@NgModule({
	declarations: [
		HeaderComponent,
		MatchRowsComponent,
		MatchRowComponent,
		MatchCardsComponent,
		MatchCardComponent,
		MatchesPageComponent,
		ButtonComponent,
		LoginModalComponent,
		CustomDropdownComponent,
		RegistrationModalComponent,
		PlaceBetModalComponent,
		BetTabsComponent,
		BetsPageComponent,
		ClickOutsideDirective,
		MatchBetsComponent,
		MatchBetComponent,
		BetsStatisticComponent,
		LoaderComponent
	],
	imports: [
		CommonModule,
		RouterLink,
		NgxSmartModalModule.forRoot(),
		DragScrollModule,
		ReactiveFormsModule
	],
	providers: [DatePipe],
	exports: [HeaderComponent, LoaderComponent]
})
export class SharedModule {}
