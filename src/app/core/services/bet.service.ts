import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { interval, map, Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';
import { HeadersService } from './headers.service';
import { EnvironmentService } from './environment.service';
import {
	Bet,
	BetResponse,
	BetsResponse,
	CurrentMatchBetInfo,
	MatchData,
	Response
} from '../interfaces';
import { SetBets } from '../../store/actions/bets.actions';

@Injectable({
	providedIn: 'root'
})
export class BetService {
	private readonly BETS_AUTO_UPDATE: number = 1000 * 60 * 5; // 5 minutes
	private betsPoolingSubscription: Subscription | undefined;

	constructor(
		private http: HttpClient,
		private store: Store,
		private environmentService: EnvironmentService,
		private headersService: HeadersService,
		private userService: UserService
	) {}

	public calculateBets(match: MatchData, bets: Bet[]): CurrentMatchBetInfo {
		return {
			homeTeamBet: bets.reduce(
				(acc: number, bet: Bet): number =>
					bet.teamId === match.homeTeam.id ? acc + bet.betAmount : acc,
				0
			),
			awayTeamBet: bets.reduce(
				(acc: number, bet: Bet): number =>
					bet.teamId === match.awayTeam.id ? acc + bet.betAmount : acc,
				0
			)
		};
	}

	public placeBet(
		matchId: string,
		teamId: string,
		betAmount: number
	): Observable<Response<BetResponse>> {
		return this.placeBetRequest(matchId, teamId, betAmount).pipe(
			map((response: Response<BetResponse>) => {
				this.userService.refreshBalance();
				return response;
			})
		);
	}

	public startBetsPooling() {
		this.stopBetsPooling();

		console.log('Start bets pooling!');
		this.updateBets();

		this.betsPoolingSubscription = interval(this.BETS_AUTO_UPDATE).subscribe({
			next: () => {
				this.updateBets();
			}
		});
	}

	public stopBetsPooling() {
		console.log('Stop bets pooling!');
		this.betsPoolingSubscription?.unsubscribe();
	}

	public updateBets(): Subscription {
		return this.getBetsRequest().subscribe({
			next: (response: Response<BetsResponse>) => {
				if (response.success) {
					this.store.dispatch(new SetBets(response.data.bets));
				}
			}
		});
	}

	public clearBets() {
		this.store.dispatch(new SetBets([]));
	}

	public cancelBet(betId: string): Observable<Response<{}>> {
		return this.cancelBetRequest(betId).pipe(
			map((response: Response<{}>) => {
				this.userService.refreshBalance();
				this.updateBets();
				return response;
			})
		);
	}

	public getBetsRequest(): Observable<Response<BetsResponse>> {
		return this.http.get<Response<BetsResponse>>(
			`${this.environmentService.environment.apiUrl}/user/bets/get-bets`,
			{
				headers: this.headersService.userHeader()
			}
		);
	}

	private placeBetRequest(
		matchId: string,
		teamId: string,
		betAmount: number
	): Observable<Response<BetResponse>> {
		return this.http.post<Response<BetResponse>>(
			`${this.environmentService.environment.apiUrl}/user/bets/place-bet`,
			{
				matchId,
				teamId,
				betAmount
			},
			{
				headers: this.headersService.userHeader()
			}
		);
	}

	private cancelBetRequest(betId: string): Observable<Response<{}>> {
		return this.http.delete<Response<{}>>(
			`${this.environmentService.environment.apiUrl}/user/bets/cancel-bet`,
			{
				headers: this.headersService.userHeader(),
				body: {
					betId
				}
			}
		);
	}
}
