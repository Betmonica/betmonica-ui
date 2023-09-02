import { Component, Input } from '@angular/core';
import { MatchesService } from '../../../core/services/matches.service';
import { MatchWithBets, MatchWithBetsAndDates } from '../../../core/interfaces';

@Component({
	selector: 'app-match-cards',
	templateUrl: './match-cards.component.html',
	styleUrls: ['./match-cards.component.scss']
})
export class MatchCardsComponent {
	constructor(private matchesService: MatchesService) {}

	public _matches: MatchWithBetsAndDates[] = [];

	@Input() public set matches(matches: MatchWithBets[]) {
		this._matches = this.matchesService.addDatesAndSortMatchWithBets(matches);
	}
}
