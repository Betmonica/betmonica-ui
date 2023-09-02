import { Component, Input } from '@angular/core';
import { MatchWithBets, MatchWithBetsAndDates } from '../../../core/interfaces';
import { MatchesService } from '../../../core/services/matches.service';

@Component({
	selector: 'app-match-rows',
	templateUrl: './match-rows.component.html',
	styleUrls: ['./match-rows.component.scss']
})
export class MatchRowsComponent {
	constructor(private matchesService: MatchesService) {}

	public _matches: MatchWithBetsAndDates[] = [];

	@Input() public set matches(matches: MatchWithBets[]) {
		this._matches = this.matchesService.addDatesAndSortMatchWithBets(matches);
	}
}
