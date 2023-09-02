import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchesPageComponent } from './shared/pages/matches-page/matches-page.component';
import { BetsPageComponent } from './shared/pages/bets-page/bets-page.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: MatchesPageComponent
	},
	{
		path: 'bets',
		component: BetsPageComponent,
		canActivate: [authGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
