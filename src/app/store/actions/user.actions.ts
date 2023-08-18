import { USER_ACTIONS } from '../../core/enums';
import { UserData } from '../../core/interfaces';

export class SetUserData {
  static readonly type = USER_ACTIONS.SET_USER_DATA;

  constructor(public payload: UserData) {
  }
}

export class ResetUserData {
  static readonly type = USER_ACTIONS.RESET_USER_DATA;
}

export class SetBalance {
  static readonly type = USER_ACTIONS.SET_BALANCE;

  constructor(public payload: number) {
  }
}
