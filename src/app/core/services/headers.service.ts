import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LOCALSTORAGE_KEYS } from '../enums';
import { TokenData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor() {
    this.getInitialTokenDataFromStorage();
  }

  public get tokenData(): TokenData {
    const accessTokenFromStorage: string | null = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
    return accessTokenFromStorage ? JSON.parse(accessTokenFromStorage) : {
      accessToken: undefined,
      expiredIn: undefined
    };
  }

  public set tokenData(tokenData: TokenData) {
    localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(tokenData));
  }

  public userHeader() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.tokenData.accessToken}`);
  }

  private getInitialTokenDataFromStorage() {
    const initialTokenData: string | null = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);

    if (!initialTokenData) {
      const cleanTokenData: TokenData = {
        accessToken: '',
        expiredIn: 0
      };

      localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, JSON.stringify(cleanTokenData));
      this.tokenData = cleanTokenData;
    } else {
      this.tokenData = JSON.parse(initialTokenData);
    }
  }
}
