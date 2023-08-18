import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { HeadersService } from './headers.service';
import { EnvironmentService } from './environment.service';
import { AuthorizationResponse, BalanceResponse, Response, TokenResponse } from '../interfaces';
import { ResetUserData, SetBalance, SetUserData } from '../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private store: Store,
    private headersService: HeadersService
  ) {
  }

  public login(email: string, password: string) {
    this.loginRequest(email, password).subscribe({
      next: (response: Response<AuthorizationResponse>) => {
        if (response.success) {
          this.headersService.accessToken = response.data.accessToken;
          this.store.dispatch(new SetUserData(response.data.user));
        }
      }
    });
  }

  public registration(email: string, password: string) {
    this.registrationRequest(email, password).subscribe({
      next: (response: Response<AuthorizationResponse>) => {
        if (response.success) {
          this.headersService.accessToken = response.data.accessToken;
          this.store.dispatch(new SetUserData(response.data.user));
        }
      }
    });
  }

  public logout() {
    this.logoutRequest().subscribe({
      next: (response: Response<{}>) => {
        if (response.success) {
          this.store.dispatch(new ResetUserData());
        }
      }
    });
  }

  public refreshAccessToken() {
    this.refreshAccessTokenRequest().subscribe({
      next: (response: Response<TokenResponse>) => {
        if (response.success) {
          this.headersService.accessToken = response.data.accessToken;
        }
      }
    });
  }

  public refreshBalance() {
    this.refreshBalanceRequest().subscribe({
      next: (response: Response<BalanceResponse>) => {
        if (response.success) {
          this.store.dispatch(new SetBalance(response.data.balance));
        }
      }
    });
  }

  private refreshBalanceRequest(): Observable<Response<BalanceResponse>> {
    return this.http.get<Response<BalanceResponse>>(`${this.environmentService.environment.apiUrl}/balance/get`);
  }

  private logoutRequest() {
    return this.http.delete<Response<{}>>(`${this.environmentService.environment.apiUrl}/user/logout`, {
      headers: this.headersService.userHeader()
    });
  }

  private refreshAccessTokenRequest(): Observable<Response<TokenResponse>> {
    return this.http.get<Response<TokenResponse>>(`${this.environmentService.environment.apiUrl}/user/refresh-token`);
  }

  private loginRequest(email: string, password: string): Observable<Response<AuthorizationResponse>> {
    return this.http.post<Response<AuthorizationResponse>>(`${this.environmentService.environment.apiUrl}/user/login`, {
      email,
      password
    });
  }

  private registrationRequest(email: string, password: string): Observable<Response<AuthorizationResponse>> {
    return this.http.post<Response<AuthorizationResponse>>(`${this.environmentService.environment.apiUrl}/user/registration`, {
      email,
      password
    });
  }
}
