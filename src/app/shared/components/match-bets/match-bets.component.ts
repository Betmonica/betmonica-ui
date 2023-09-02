import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BetsState } from '../../../store/states/bets.state';
import { BetState } from '../../../core/interfaces';

@Component({
	selector: 'app-match-bets',
	templateUrl: './match-bets.component.html',
	styleUrls: ['./match-bets.component.scss']
})
export class MatchBetsComponent implements OnInit, OnDestroy {
	@Select(BetsState.betsWithMatchData)
	private betsWithMatchData$!: Observable<BetState[]>;
	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	public betsWithMatchData: BetState[] = [];

	constructor() {}

	ngOnInit() {
		this.betsWithMatchData$.pipe(takeUntil(this.unsubscribe$)).subscribe({
			next: (betsWithMatchData: BetState[]) => {
				this.betsWithMatchData = this.sortBetsByMatchStartTime([
					...betsWithMatchData
				]);
			}
		});
	}

	private sortBetsByMatchStartTime(betsWithMatchData: BetState[]): BetState[] {
		return betsWithMatchData.sort(
			(betWithMatchDataA: BetState, betWithMatchDataB: BetState) =>
				new Date(betWithMatchDataB.match.startDate).getTime() -
				new Date(betWithMatchDataA.match.startDate).getTime()
		);
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
