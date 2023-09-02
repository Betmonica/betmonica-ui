import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';
import { MatchesState } from '../../../store/states/matches.state';
import { BetsState } from '../../../store/states/bets.state';
import { MatchesService } from '../../../core/services/matches.service';
import { Bet, MatchData, MatchWithBets } from '../../../core/interfaces';
import { BetService } from '../../../core/services/bet.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
	selector: 'app-matches-page',
	templateUrl: './matches-page.component.html',
	styleUrls: ['./matches-page.component.scss']
})
export class MatchesPageComponent implements OnInit, OnDestroy {
	public liveMatches: MatchData[] = [];
	public upcomingMatches: MatchData[] = [];

	public liveMatchesWithBets: MatchWithBets[] = [];
	public upcomingMatchesWithBets: MatchWithBets[] = [];

	public bets: Bet[] = [];

	@Select(MatchesState.liveMatches)
	private liveMatches$!: Observable<MatchData[]>;
	@Select(MatchesState.upcomingMatches)
	private upcomingMatches$!: Observable<MatchData[]>;
	@Select(BetsState.allBets)
	private bets$!: Observable<Bet[]>;

	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private matchesService: MatchesService,
		private betService: BetService,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.matchesService.startMatchesPooling();

		this.authenticationService.isLoggedIn$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: (isLoggedIn: boolean) => {
					if (isLoggedIn) {
						this.betService.startBetsPooling();
					} else {
						this.betService.stopBetsPooling();
					}
				}
			});

		this.liveMatches$.pipe(takeUntil(this.unsubscribe$)).subscribe({
			next: (liveMatches: MatchData[]): void => {
				this.liveMatches = liveMatches;
				this.liveMatchesWithBets = this.matchesService.mergeMatchesWithBets(
					liveMatches,
					this.bets
				);
			}
		});

		this.upcomingMatches$.pipe(takeUntil(this.unsubscribe$)).subscribe({
			next: (upcomingMatches: MatchData[]): void => {
				this.upcomingMatches = upcomingMatches;
				this.upcomingMatchesWithBets = this.matchesService.mergeMatchesWithBets(
					upcomingMatches,
					this.bets
				);
			}
		});

		this.bets$.pipe(takeUntil(this.unsubscribe$)).subscribe({
			next: (bets: Bet[]) => {
				this.bets = bets;
				this.liveMatchesWithBets = this.matchesService.mergeMatchesWithBets(
					this.liveMatches,
					bets
				);
				this.upcomingMatchesWithBets = this.matchesService.mergeMatchesWithBets(
					this.upcomingMatches,
					bets
				);
			}
		});
	}

	ngOnDestroy() {
		this.matchesService.stopMatchesPooling();
		this.betService.stopBetsPooling();

		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
