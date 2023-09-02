import { Component, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BetService } from '../../../../core/services/bet.service';
import {
	Bet,
	ButtonData,
	CurrentMatchBetInfo,
	MatchData,
	PlaceBetModalData
} from '../../../../core/interfaces';
import { BUTTON_SIZE, BUTTON_TYPES, MODAL_IDS } from '../../../../core/enums';

@Component({
	selector: 'app-match-row',
	templateUrl: './match-row.component.html',
	styleUrls: ['./match-row.component.scss']
})
export class MatchRowComponent {
	public betData!: CurrentMatchBetInfo;

	@Input() public match!: MatchData;
	@Input() public set bets(bets: Bet[]) {
		this.betData = this.betService.calculateBets(this.match, bets);
	}
	public betButtonData: ButtonData = {
		type: BUTTON_TYPES.GREEN,
		size: BUTTON_SIZE.MEDIUM,
		borderRadius: 10
	};

	constructor(
		private betService: BetService,
		private modalService: NgxSmartModalService
	) {}

	public openPlaceBetModal(selectedTeamId: string) {
		const placeBetModalData: PlaceBetModalData = {
			match: this.match,
			selectedTeamId: selectedTeamId
		};
		this.modalService.open(MODAL_IDS.PLACE_BET_MODAL);
		this.modalService.resetModalData(MODAL_IDS.PLACE_BET_MODAL);
		this.modalService.setModalData(
			placeBetModalData,
			MODAL_IDS.PLACE_BET_MODAL
		);
	}
}
