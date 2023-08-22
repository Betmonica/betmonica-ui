import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { HeadersService } from './headers.service';
import { EnvironmentService } from './environment.service';
import { AuthorizationResponse, BalanceResponse, Response, TokenData, UserDataResponse } from '../interfaces';
import { ResetUserData, SetBalance, SetUserData } from '../../store/actions/user.actions';
import { AdditionalService } from './additional.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private store: Store,
    private headersService: HeadersService,
    private additionalService: AdditionalService
  ) {
    this.getUserData().subscribe({
      next: (response: Response<UserDataResponse>) => {
        this.store.dispatch(new SetUserData(response.data.user));
      }
    });
    this.startAutoRefreshAccessToken();
  }

  public login(email: string, password: string): Observable<Response<AuthorizationResponse>> {
    return this.loginRequest(email, password).pipe(
      map((response: Response<AuthorizationResponse>) => {
        this.headersService.tokenData = response.data.tokenData;
        this.store.dispatch(new SetUserData(response.data.user));

        return response;
      })
    );
  }

  public registration(email: string, password: string) {
    return this.registrationRequest(email, password).pipe(
      map((response: Response<AuthorizationResponse>) => {
        this.headersService.tokenData = response.data.tokenData;
        this.store.dispatch(new SetUserData(response.data.user));

        return response;
      })
    );
  }

  public logout() {
    this.logoutRequest().subscribe({
      next: () => {
        this.store.dispatch(new ResetUserData());
      }
    });
  }

  public refreshAccessToken() {
    this.refreshAccessTokenRequest().subscribe({
      next: (response: Response<TokenData>) => {
        this.headersService.tokenData = response.data;
      },
      error: () => {
        this.headersService.tokenData = {} as TokenData;
      }
    });
  }

  public refreshBalance() {
    this.refreshBalanceRequest().subscribe({
      next: (response: Response<BalanceResponse>) => {
        this.store.dispatch(new SetBalance(response.data.balance));
      }
    });
  }

  private startAutoRefreshAccessToken() {
    if (
      this.headersService.tokenData?.accessToken == null || this.headersService.tokenData?.expiredIn == null
    ) {
      return;
    }

    const convertedExpiredIn: number = new Date(0).setUTCSeconds(this.headersService.tokenData.expiredIn);
    this.additionalService.callCodeAt(convertedExpiredIn).subscribe({
      next: () => {
        this.refreshAccessToken();
        this.startAutoRefreshAccessToken();
      }
    });
  }

  private getUserData(): Observable<Response<UserDataResponse>> {
    return this.http.get<Response<UserDataResponse>>(`${this.environmentService.environment.apiUrl}/user/user-data`, {
      headers: this.headersService.userHeader()
    });
  }

  private refreshBalanceRequest(): Observable<Response<BalanceResponse>> {
    return this.http.get<Response<BalanceResponse>>(`${this.environmentService.environment.apiUrl}/balance/get`);
  }

  private logoutRequest() {
    return this.http.delete<Response<{}>>(`${this.environmentService.environment.apiUrl}/user/logout`);
  }

  private refreshAccessTokenRequest(): Observable<Response<TokenData>> {
    return this.http.get<Response<TokenData>>(`${this.environmentService.environment.apiUrl}/user/refresh-token`, { withCredentials: true });
  }

  private loginRequest(email: string, password: string): Observable<Response<AuthorizationResponse>> {
    return this.http.post<Response<AuthorizationResponse>>(`${this.environmentService.environment.apiUrl}/user/login`, {
      email,
      password
    }, { withCredentials: true });
  }

  private registrationRequest(email: string, password: string): Observable<Response<AuthorizationResponse>> {
    return this.http.post<Response<AuthorizationResponse>>(`${this.environmentService.environment.apiUrl}/user/registration`, {
      email,
      password
    });
  }
}
