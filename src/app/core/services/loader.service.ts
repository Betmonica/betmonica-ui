import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {
	private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);
	isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

	setLoading(isLoading: boolean) {
		this.isLoading$$.next(isLoading);
	}
}
