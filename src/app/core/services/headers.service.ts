import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LOCALSTORAGE_KEYS } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
  public get accessToken(): string {
    const accessTokenFromStorage: string | null = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    return accessTokenFromStorage ? JSON.parse(accessTokenFromStorage) : '';
  }

  public set accessToken(accessToken: string) {
    localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }

  public userHeader() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
  }
}
