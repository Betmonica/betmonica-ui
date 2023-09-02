import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { HeadersService } from './headers.service';
import { EnvironmentService } from './environment.service';
import { SetBalance } from '../../store/actions/user.actions';
import { BalanceResponse, Response } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private readonly REFRESH_BALANCE_TIME: number = 1000 * 30; // 30 seconds
	private balancePoolingSubscription: Subscription | undefined;

	constructor(
		private http: HttpClient,
		private environmentService: EnvironmentService,
		private store: Store,
		private headersService: HeadersService
	) {}

	public startBalancePooling() {
		this.stopBalancePooling();

		console.log('Start balance pooling!');
		this.refreshBalance();

		this.balancePoolingSubscription = interval(
			this.REFRESH_BALANCE_TIME
		).subscribe({
			next: () => {
				this.refreshBalance();
			}
		});
	}

	public stopBalancePooling() {
		console.log('Stop balance pooling!');
		this.balancePoolingSubscription?.unsubscribe();
	}

	public refreshBalance(): void {
		this.refreshBalanceRequest().subscribe({
			next: (response: Response<BalanceResponse>) => {
				console.log(
					'Balance refreshed! Current balance:',
					response.data.balance
				);
				this.store.dispatch(new SetBalance(response.data.balance));
			}
		});
	}

	private refreshBalanceRequest(): Observable<Response<BalanceResponse>> {
		return this.http.get<Response<BalanceResponse>>(
			`${this.environmentService.environment.apiUrl}/user/balance/get`,
			{
				headers: this.headersService.userHeader()
			}
		);
	}
}
