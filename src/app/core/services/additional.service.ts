import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AdditionalService {
	public callCodeAt(targetTimeInMillis: number): Observable<boolean> {
		return new Observable((subscriber: Subscriber<boolean>) => {
			const currentTime: number = new Date().getTime();
			const timeDifference: number = targetTimeInMillis - currentTime;

			if (timeDifference > 0) {
				setTimeout(() => {
					subscriber.next(true);
					subscriber.complete();
				}, timeDifference);
			} else {
				subscriber.next(false);
				subscriber.complete();
			}
		});
	}
}
