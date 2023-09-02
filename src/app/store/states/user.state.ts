import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
	ResetUserData,
	SetUserData,
	SetBalance
} from '../actions/user.actions';
import { IAction, UserData } from '../../core/interfaces';

@State<UserData>({
	name: 'user',
	defaults: {} as UserData
})
@Injectable()
export class UserState {
	@Selector()
	static balance(state: UserData): number {
		return state.balance || 0;
	}

	@Action(SetUserData)
	private setUserData(
		ctx: StateContext<UserData>,
		action: IAction<UserData>
	): UserData {
		return ctx.setState(action.payload);
	}

	@Action(ResetUserData)
	private resetUserData(ctx: StateContext<UserData>): UserData {
		return ctx.setState({} as UserData);
	}

	@Action(SetBalance)
	private setBalance(
		ctx: StateContext<UserData>,
		action: IAction<number>
	): UserData {
		const state: UserData = ctx.getState();
		const balance: number = action.payload;

		return ctx.setState({
			...state,
			balance
		});
	}
}
