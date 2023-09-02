import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges
} from '@angular/core';
import { Bet, ButtonData, MatchData } from '../../../../core/interfaces';
import {
	BET_STATUSES,
	BUTTON_SIZE,
	BUTTON_TYPES,
	MATCH_STATUSES
} from '../../../../core/enums';
import { BetService } from '../../../../core/services/bet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-match-bet',
	templateUrl: './match-bet.component.html',
	styleUrls: ['./match-bet.component.scss']
})
export class MatchBetComponent implements OnInit, OnChanges {
	@Input() public match!: MatchData;
	@Input() public bet!: Bet;
	public betTeamName: string = '';
	public isPossibleToCancelBet: boolean = false;

	public buttonData: ButtonData = {
		type: BUTTON_TYPES.RED,
		size: BUTTON_SIZE.MEDIUM,
		borderRadius: 5
	};

	constructor(
		private betService: BetService,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.betTeamName =
			this.bet.teamId === this.match.homeTeam.id
				? this.match.homeTeam.name
				: this.match.awayTeam.name;
	}

	get BET_STATUSES(): typeof BET_STATUSES {
		return BET_STATUSES;
	}

	public cancelBet() {
		this.betService.cancelBet(this.bet.id).subscribe({
			next: () => {
				this.toastrService.success('Success cancelled!');
			}
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.isPossibleToCancelBet =
			!this.match.isLive && this.match.status === MATCH_STATUSES.UPCOMING;
	}
}
