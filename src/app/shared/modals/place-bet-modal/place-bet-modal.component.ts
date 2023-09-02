import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { UserState } from '../../../store/states/user.state';
import { BetService } from '../../../core/services/bet.service';
import {
	ButtonData,
	PlaceBetModalData,
	BetResponse,
	Response
} from '../../../core/interfaces';
import { BUTTON_SIZE, BUTTON_TYPES, MODAL_IDS } from '../../../core/enums';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserService } from '../../../core/services/user.service';

@Component({
	selector: 'app-place-bet-modal',
	templateUrl: './place-bet-modal.component.html',
	styleUrls: ['./place-bet-modal.component.scss']
})
export class PlaceBetModalComponent implements OnInit, OnDestroy {
	public readonly MIN_BET_AMOUNT: number = 10;
	public readonly placeBetButtonData: ButtonData = {
		type: BUTTON_TYPES.GREEN,
		size: BUTTON_SIZE.WIDE,
		borderRadius: 5
	};

	public betForm!: FormGroup;
	public matchData!: PlaceBetModalData;

	@Select(UserState.balance) private userBalance$!: BehaviorSubject<number>;
	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	public userBalance: number = 0;

	constructor(
		private betService: BetService,
		private toastrService: ToastrService,
		private modalService: NgxSmartModalService,
		private userService: UserService
	) {}

	ngOnInit() {
		this.betForm = new FormGroup({
			teamId: new FormControl('', [Validators.required]),
			betAmount: new FormControl(0, [
				Validators.required,
				Validators.min(this.MIN_BET_AMOUNT),
				Validators.max(this.MIN_BET_AMOUNT)
			])
		});

		this.userBalance$.pipe(takeUntil(this.unsubscribe$)).subscribe({
			next: (userBalance: number) => {
				this.userBalance = userBalance;

				this.betForm
					.get('betAmount')
					?.setValidators([
						Validators.required,
						Validators.min(this.MIN_BET_AMOUNT),
						Validators.max(userBalance)
					]);
			}
		});
	}

	public setModalData(matchData: PlaceBetModalData) {
		this.matchData = matchData;
		this.betForm.get('teamId')?.setValue(matchData.selectedTeamId);
	}

	public onSubmit() {
		if (this.betForm.invalid) {
			return;
		}

		const matchId: string = this.matchData.match.id;
		const { teamId, betAmount } = this.betForm.value;
		this.betService.placeBet(matchId, teamId, betAmount).subscribe({
			next: (response: Response<BetResponse>) => {
				if (response.success) {
					this.betService.updateBets();
					this.modalService.close(MODAL_IDS.PLACE_BET_MODAL);
					this.userService.refreshBalance();
					this.toastrService.success('Bet placed successfully!');
				}
			},
			error: () => {
				this.toastrService.error('Something went wrong while placing bet!');
			}
		});
	}

	ngOnDestroy() {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
