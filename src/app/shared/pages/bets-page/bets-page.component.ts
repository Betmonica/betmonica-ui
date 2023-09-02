import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BetService } from '../../../core/services/bet.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
	selector: 'app-bets-page',
	templateUrl: './bets-page.component.html',
	styleUrls: ['./bets-page.component.scss']
})
export class BetsPageComponent implements OnInit, OnDestroy {
	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private router: Router,
		private betService: BetService,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.authenticationService.isLoggedIn$
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: (isLoggedIn: boolean) => {
					if (!isLoggedIn) {
						this.router.navigateByUrl('/');
					}
				}
			});

		this.betService.startBetsPooling();
	}

	ngOnDestroy() {
		this.betService.stopBetsPooling();

		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
