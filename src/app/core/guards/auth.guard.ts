import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { UserData } from '../interfaces';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = () => {
	const router: Router = inject(Router);
	const jwtService: JwtService = inject(JwtService);
	const authenticationService: AuthenticationService = inject(
		AuthenticationService
	);

	return new Observable((subscriber: Subscriber<boolean | UrlTree>) => {
		const accessToken: string = authenticationService.accessToken;

		if (!accessToken) {
			router.navigateByUrl('/');
			subscriber.next(false);
			subscriber.complete();
		}

		if (jwtService.getDataByToken<UserData>(accessToken).id) {
			if (jwtService.isTokenExpired(accessToken)) {
				authenticationService.refreshAccessToken().subscribe({
					next: () => {
						subscriber.next(true);
						subscriber.complete();
					},
					error: () => {
						router.navigateByUrl('/');
						subscriber.next(false);
						subscriber.complete();
					}
				});
			} else {
				subscriber.next(true);
				subscriber.complete();
			}
		} else {
			router.navigateByUrl('/');
			subscriber.next(false);
			subscriber.complete();
		}
	});
};
