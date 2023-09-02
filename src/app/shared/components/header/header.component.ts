import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserState } from '../../../store/states/user.state';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { BUTTON_SIZE, BUTTON_TYPES, MODAL_IDS } from '../../../core/enums';
import { ButtonData, DropdownItem, UserData } from '../../../core/interfaces';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	public authenticationButtonsData: ButtonData = {
		size: BUTTON_SIZE.SMALL,
		type: BUTTON_TYPES.GREEN,
		borderRadius: 2
	};
	public isProfilePopoverOpen: boolean = false;
	public user?: UserData;
	public profileMenu: DropdownItem[] = [
		{
			name: 'Bets',
			onClick: () => {
				this.router.navigateByUrl('/bets');
				this.closePopover();
			}
		},
		{
			name: 'Logout',
			onClick: () => {
				this.authenticationService.logout();
				this.closePopover();
			}
		}
	];

	@Select(UserState) private user$!: Observable<UserData>;
	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private router: Router,
		private modalService: NgxSmartModalService,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe({
			next: (user: UserData) => {
				this.user = user;
			}
		});
	}

	public openLoginModal() {
		this.modalService.open(MODAL_IDS.LOGIN_MODAL);
	}

	public openRegistrationModal() {
		this.modalService.getModal(MODAL_IDS.REGISTRATION_MODAL).open();
	}

	public closePopover() {
		this.isProfilePopoverOpen = false;
	}

	public handlePopover() {
		this.isProfilePopoverOpen = !this.isProfilePopoverOpen;
	}

	ngOnDestroy() {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
