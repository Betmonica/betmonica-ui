import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	BehaviorSubject,
	catchError,
	map,
	Observable,
	of,
	Subscription
} from 'rxjs';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { AdditionalService } from './additional.service';
import { EnvironmentService } from './environment.service';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { ResetUserData, SetUserData } from '../../store/actions/user.actions';
import { Response, TokenData, UserData } from '../interfaces';
import { LOCALSTORAGE_KEYS } from '../enums';
import { BetService } from './bet.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private isLoggedIn$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);
	private callCodeAtSubscription: Subscription | undefined;

	public set isLoggedIn(isLoggedIn: boolean) {
		this.isLoggedIn$$.next(isLoggedIn);

		if (isLoggedIn) {
			this.startAutoRefreshAccessToken();
			this.userService.startBalancePooling();
		} else {
			this.stopAutoRefreshAccessToken();
			this.betService.clearBets();
			this.userService.stopBalancePooling();
		}
	}

	public get isLoggedIn(): boolean {
		return this.isLoggedIn$$.getValue();
	}

	public get isLoggedIn$() {
		return this.isLoggedIn$$.asObservable();
	}

	constructor(
		private http: HttpClient,
		private environmentService: EnvironmentService,
		private store: Store,
		private additionalService: AdditionalService,
		private userService: UserService,
		private toastrService: ToastrService,
		private jwtService: JwtService,
		private betService: BetService
	) {
		const accessToken: string = this.accessToken;

		if (accessToken) {
			this.isLoggedIn = true;

			if (!this.jwtService.isTokenExpired(accessToken)) {
				const userData: UserData = this.jwtService.getDataByToken(accessToken);
				this.store.dispatch(new SetUserData(userData));
			}
		}
	}

	public login(
		email: string,
		password: string
	): Observable<Response<TokenData>> {
		return this.loginRequest(email, password).pipe(
			map((response: Response<TokenData>) => {
				const userData: UserData = this.jwtService.getDecodeToken<UserData>(
					response.data.accessToken
				);
				this.store.dispatch(new SetUserData(userData));
				this.accessToken = response.data.accessToken;
				this.isLoggedIn = true;

				return response;
			})
		);
	}

	public registration(
		username: string,
		email: string,
		password: string
	): Observable<Response<TokenData>> {
		return this.registrationRequest(username, email, password).pipe(
			map((response: Response<TokenData>) => {
				const userData: UserData = this.jwtService.getDecodeToken<UserData>(
					response.data.accessToken
				);
				this.store.dispatch(new SetUserData(userData));
				this.accessToken = response.data.accessToken;
				this.isLoggedIn = true;

				return response;
			})
		);
	}

	public logout(): void {
		this.logoutRequest().subscribe({
			complete: () => {
				this.accessToken = '';
				this.isLoggedIn = false;
				this.store.dispatch(new ResetUserData());
			}
		});
	}

	public refreshAccessToken(): Observable<boolean> {
		return this.refreshAccessTokenRequest().pipe(
			map((response: Response<TokenData>): boolean => {
				this.accessToken = response.data.accessToken;
				this.isLoggedIn = true;
				return true;
			}),
			catchError(() => {
				this.accessToken = '';
				this.isLoggedIn = false;
				return of(false);
			})
		);
	}

	private startAutoRefreshAccessToken(): void {
		this.stopAutoRefreshAccessToken();

		console.log('Start tracking token expire!');
		const expiredIn: number = this.jwtService.getExpiryTime(this.accessToken);
		const convertedExpiredIn: number = new Date(0).setUTCSeconds(expiredIn);

		this.callCodeAtSubscription = this.additionalService
			.callCodeAt(convertedExpiredIn)
			.subscribe({
				next: () => {
					this.refreshAccessToken().subscribe({
						next: (isRefreshed: boolean) => {
							if (!isRefreshed) {
								console.log('Token is not refreshed!');
								return;
							}

							console.log('Token refreshed! Start new token expire track!');
							this.startAutoRefreshAccessToken();
						}
					});
				}
			});
	}

	private stopAutoRefreshAccessToken() {
		console.log('Stop tracking token expire!');
		this.callCodeAtSubscription?.unsubscribe();
	}

	public get accessToken(): string {
		const accessToken: string | null = localStorage.getItem(
			LOCALSTORAGE_KEYS.ACCESS_TOKEN
		);

		if (!accessToken) {
			return '';
		}

		return JSON.parse(accessToken);
	}

	public set accessToken(accessToken: string) {
		localStorage.setItem(
			LOCALSTORAGE_KEYS.ACCESS_TOKEN,
			JSON.stringify(accessToken)
		);
	}

	private logoutRequest(): Observable<Response<{}>> {
		return this.http.delete<Response<{}>>(
			`${this.environmentService.environment.apiUrl}/user/logout`,
			{ withCredentials: true }
		);
	}

	private refreshAccessTokenRequest(): Observable<Response<TokenData>> {
		return this.http.get<Response<TokenData>>(
			`${this.environmentService.environment.apiUrl}/user/refresh-token`,
			{ withCredentials: true }
		);
	}

	private loginRequest(
		email: string,
		password: string
	): Observable<Response<TokenData>> {
		return this.http.post<Response<TokenData>>(
			`${this.environmentService.environment.apiUrl}/user/login`,
			{
				email,
				password
			},
			{ withCredentials: true }
		);
	}

	private registrationRequest(
		username: string,
		email: string,
		password: string
	): Observable<Response<TokenData>> {
		return this.http.post<Response<TokenData>>(
			`${this.environmentService.environment.apiUrl}/user/registration`,
			{
				username,
				email,
				password
			}
		);
	}
}
