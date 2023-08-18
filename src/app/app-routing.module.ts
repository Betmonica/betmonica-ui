import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesPageComponent } from './shared/pages/matches-page/matches-page.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
