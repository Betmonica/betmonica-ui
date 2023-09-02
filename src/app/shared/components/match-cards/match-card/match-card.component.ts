import { Component, Input } from '@angular/core';
import {
	Bet,
	CurrentMatchBetInfo,
	MatchData
} from '../../../../core/interfaces';
import { BetService } from '../../../../core/services/bet.service';

@Component({
	selector: 'app-match-card',
	templateUrl: './match-card.component.html',
	styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent {
	public betData!: CurrentMatchBetInfo;

	@Input() match!: MatchData;
	@Input() public set bets(bets: Bet[]) {
		this.betData = this.betService.calculateBets(this.match, bets);
	}

	constructor(private betService: BetService) {}
}
