import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LOCALSTORAGE_KEYS } from '../enums';

@Injectable({
	providedIn: 'root'
})
export class HeadersService {
	constructor() {}

	public userHeader(): HttpHeaders {
		return new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
	}

	public get accessToken(): string {
		const accessToken = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
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
}
