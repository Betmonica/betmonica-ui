import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { interval, Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetMatches } from '../../store/actions/matches.actions';
import { EnvironmentService } from './environment.service';
import {
	Bet,
	MatchData,
	MatchesResponse,
	MatchWithBets,
	MatchWithBetsAndDates,
	Response
} from '../interfaces';
import { MATCH_STATUSES } from '../enums';
import { BetService } from './bet.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class MatchesService {
	private readonly MATCH_AUTO_UPDATE: number = 1000 * 60 * 5; // 5 minutes
	private matchesPoolingSubscription: Subscription | undefined;

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService,
		private environmentService: EnvironmentService,
		private betService: BetService,
		private store: Store,
		private datePipe: DatePipe
	) {}

	public startMatchesPooling(): void {
		this.stopMatchesPooling();

		console.log('Start matches pooling!');
		this.updateMatches();

		this.matchesPoolingSubscription = interval(
			this.MATCH_AUTO_UPDATE
		).subscribe({
			next: () => {
				this.updateMatches();
			}
		});
	}

	public stopMatchesPooling() {
		console.log('Stop matches pooling!');
		this.matchesPoolingSubscription?.unsubscribe();
	}

	public sortMatchesWithBetsByTime(
		matchesWithBets: MatchWithBets[]
	): MatchWithBets[] {
		return matchesWithBets.sort(
			(matchA: MatchWithBets, matchB: MatchWithBets) => {
				return (
					new Date(matchA.match.startDate).getTime() -
					new Date(matchB.match.startDate).getTime()
				);
			}
		);
	}

	public mergeMatchesWithBets(
		matches: MatchData[],
		bets: Bet[]
	): MatchWithBets[] {
		const betsObj = bets.reduce((acc: any, bet: Bet) => {
			if (!acc[bet.matchId]) {
				acc[bet.matchId] = [];
			}

			acc[bet.matchId].push(bet);
			return acc;
		}, {});

		return matches.map(
			(matchData: MatchData): MatchWithBets => ({
				match: matchData,
				bets: betsObj[matchData.id] || []
			})
		);
	}

	public addDatesAndSortMatchWithBets(
		matchesWithBets: MatchWithBets[]
	): MatchWithBetsAndDates[] {
		const sortedMatchesByDate: MatchWithBets[] =
			this.sortMatchesWithBetsByTime(matchesWithBets);

		const matchWithBetsAndDates: MatchWithBetsAndDates[] = [];

		sortedMatchesByDate.forEach((matchState: MatchWithBets) => {
			const date: Date = new Date(matchState.match.startDate);

			const countIndexes: number = matchWithBetsAndDates.length - 1;

			const lastBlockDate: string =
				this.datePipe.transform(
					matchWithBetsAndDates?.[countIndexes]?.date,
					'MM-dd-YYYY'
				) || '';
			const formattedDate: string =
				this.datePipe.transform(date, 'MM-dd-YYYY') || '';

			if (formattedDate !== lastBlockDate) {
				matchWithBetsAndDates[countIndexes + 1] = {
					date: formattedDate,
					matchesWithBets: [matchState]
				};
			} else {
				matchWithBetsAndDates[countIndexes].matchesWithBets.push(matchState);
			}
		});

		return matchWithBetsAndDates;
	}

	private updateMatches(): Subscription {
		return this.getMatchesRequest().subscribe({
			next: (matchesState: Response<MatchesResponse>) => {
				this.store.dispatch(new SetMatches(matchesState.data.matches));
			}
		});
	}

	private getMatchesRequest(
		status: MATCH_STATUSES = MATCH_STATUSES.UPCOMING
	): Observable<Response<MatchesResponse>> {
		return this.http.get<Response<MatchesResponse>>(
			`${this.environmentService.environment.apiUrl}/matches/get`,
			{
				params: {
					status
				}
			}
		);
	}
}
