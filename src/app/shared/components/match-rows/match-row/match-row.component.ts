import { Component, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { BetService } from '../../../../core/services/bet.service';
import {
  Bet,
  ButtonData,
  CurrentMatchBetInfo,
  MatchData,
  PlaceBetModalData
} from '../../../../core/interfaces';
import { BUTTON_SIZE, BUTTON_TYPES, MODAL_IDS } from '../../../../core/enums';
import { AuthenticationService } from '../../../../core/services/authentication.service';

@Component({
  selector: 'app-match-row',
  templateUrl: './match-row.component.html',
  styleUrls: ['./match-row.component.scss']
})
export class MatchRowComponent {
  public betData!: CurrentMatchBetInfo;

  @Input() public match!: MatchData;
  public betButtonData: ButtonData = {
    type: BUTTON_TYPES.GREEN,
    size: BUTTON_SIZE.MEDIUM,
    borderRadius: 10
  };

  constructor(
    private betService: BetService,
    private modalService: NgxSmartModalService,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService
  ) {
  }

  @Input()
  public set bets(bets: Bet[]) {
    this.betData = this.betService.calculateBets(this.match, bets);
  }

  public openPlaceBetModal(selectedTeamId: string) {
    if (!this.authenticationService.isLoggedIn) {
      this.toastrService.error('Please login!');
      return;
    }

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
