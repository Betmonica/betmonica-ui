import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BetsState } from '../../../store/states/bets.state';
import { Bet } from '../../../core/interfaces';
import { BET_STATUSES } from '../../../core/enums';

interface Statistic {
	won: number;
	maxWon: number;
	totalWon: number;
	lost: number;
	maxLost: number;
	totalLost: number;
	profit: number;
}

interface BetStatistic {
	count: number;
	max: number;
	total: number;
}

@Component({
	selector: 'app-bets-statistic',
	templateUrl: './bets-statistic.component.html',
	styleUrls: ['./bets-statistic.component.scss']
})
export class BetsStatisticComponent implements OnInit, OnDestroy {
	@Select(BetsState.allBets) private allBets$!: Observable<Bet[]>;
	private unsubscribe$: Subject<boolean> = new Subject();

	public statistic: Statistic = {} as Statistic;

	ngOnInit() {
		this.allBets$.pipe(takeUntil(this.unsubscribe$)).subscribe({
			next: (allBets: Bet[]): void => {
				this.calculateStatistic(allBets);
			}
		});
	}

	calculateStatistic(allBets: Bet[]) {
		const wonStatistic: BetStatistic = this.calculateBetsStatistic(
			allBets,
			BET_STATUSES.WON
		);

		const loseStatistic: BetStatistic = this.calculateBetsStatistic(
			allBets,
			BET_STATUSES.LOSE
		);

		this.statistic = {
			won: wonStatistic.count,
			maxWon: wonStatistic.max,
			totalWon: wonStatistic.total,
			lost: loseStatistic.count,
			maxLost: loseStatistic.max,
			totalLost: loseStatistic.total,
			profit: wonStatistic.total - loseStatistic.total
		};
	}

	calculateBetsStatistic(
		allBets: Bet[],
		betStatus: BET_STATUSES
	): BetStatistic {
		return allBets.reduce(
			(acc: BetStatistic, bet: Bet) => {
				if (bet.status === betStatus) {
					acc.count += 1;

					switch (betStatus) {
						case BET_STATUSES.LOSE:
							acc.max = bet.betAmount > acc.max ? bet.betAmount : acc.max;
							acc.total += bet.betAmount;
							break;
						case BET_STATUSES.WON:
							const wonAmount: number =
								bet.betAmount * bet.betOdd - bet.betAmount;
							acc.max = wonAmount > acc.max ? wonAmount : acc.max;
							acc.total += wonAmount;
							break;
					}
				}
				return acc;
			},
			{
				count: 0,
				max: 0,
				total: 0
			}
		);
	}

	ngOnDestroy() {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
