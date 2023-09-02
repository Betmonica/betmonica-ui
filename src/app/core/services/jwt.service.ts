import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { JwtData } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class JwtService {
	getDataByToken<T extends JwtData>(token: string): T {
		return this.getDecodeToken<T>(token);
	}

	public isTokenExpired(token: string): boolean {
		const expiryTime: number | null = this.getExpiryTime(token);

		if (expiryTime) {
			return 1000 * expiryTime - new Date().getTime() < 5000;
		} else {
			return false;
		}
	}

	public getExpiryTime(token: string): number {
		const decodedToken: JwtData = this.getDecodeToken(token);
		return decodedToken.exp || 0;
	}

	public getDecodeToken<T>(token: string): T {
		return jwt_decode<T>(token);
	}
}
