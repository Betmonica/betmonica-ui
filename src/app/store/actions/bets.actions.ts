import { BETS_ACTIONS } from '../../core/enums';
import { BetState } from '../../core/interfaces';

export class SetBets {
	static readonly type: BETS_ACTIONS = BETS_ACTIONS.SET_BETS;

	constructor(public payload: BetState[]) {}
}
