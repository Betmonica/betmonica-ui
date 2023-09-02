import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Bet, BetState, IAction } from '../../core/interfaces';
import { BET_STATUSES } from '../../core/enums';
import { SetBets } from '../actions/bets.actions';

@State<BetState[]>({
	name: 'bets',
	defaults: []
})
@Injectable()
export class BetsState {
	@Selector()
	static betsWithMatchData(state: BetState[]): BetState[] {
		return state;
	}

	@Selector()
	static allBets(state: BetState[]): Bet[] {
		return state.map((betData: BetState) => betData.bet);
	}

	@Selector()
	static upcomingBets(state: BetState[]): Bet[] {
		return state
			.map((betData: BetState) => betData.bet)
			.filter((bet: Bet): boolean => bet.status === BET_STATUSES.UPCOMING);
	}

	@Selector()
	static wonBets(state: BetState[]): Bet[] {
		return state
			.map((betData: BetState) => betData.bet)
			.filter((bet: Bet): boolean => bet.status === BET_STATUSES.WON);
	}

	@Selector()
	static loseBets(state: BetState[]): Bet[] {
		return state
			.map((betData: BetState) => betData.bet)
			.filter((bet: Bet): boolean => bet.status === BET_STATUSES.LOSE);
	}

	@Action(SetBets)
	private setMatches(
		ctx: StateContext<BetState[]>,
		action: IAction<BetState[]>
	): BetState[] {
		const matches: BetState[] = action.payload;
		return ctx.setState(matches);
	}
}
