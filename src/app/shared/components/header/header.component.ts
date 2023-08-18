import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { UserState } from '../../../store/states/user.state';
import { ButtonData, UserData } from '../../../core/interfaces';
import { BUTTON_SIZE, BUTTON_TYPES, MODAL_IDS } from '../../../core/enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: UserData | undefined;
  public authorizationButtonsData: ButtonData = {
    size: BUTTON_SIZE.SMALL,
    type: BUTTON_TYPES.GREEN,
    borderRadius: 2
  };

  @Select(UserState) private user$!: Observable<UserData>;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private modalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (user: UserData) => {
        this.user = user;
      }
    });
  }

  public openLoginModal() {
    this.modalService.getModal(MODAL_IDS.LOGIN_MODAL).open();
  }

  public openRegistrationModal() {
    this.modalService.getModal(MODAL_IDS.REGISTRATION_MODAL).open();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
