import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

/** PAGES **/
import { MatchesPageComponent } from './pages/matches-page/matches-page.component';

/** COMPONENTS **/
import { HeaderComponent } from './components/header/header.component';
import { MatchRowsComponent } from './components/match-rows/match-rows.component';
import { MatchRowComponent } from './components/match-rows/match-row/match-row.component';
import { MatchCardsComponent } from './components/match-cards/match-cards.component';
import { MatchCardComponent } from './components/match-cards/match-card/match-card.component';
import { ButtonComponent } from './components/button/button.component';

/** MODALS **/
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegistrationModalComponent } from './modals/registration-modal/registration-modal.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ReactiveFormsModule } from '@angular/forms';


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
    RegistrationModalComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    NgxSmartModalModule.forRoot(),
    DragScrollModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule {
}
