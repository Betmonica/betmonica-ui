import { MATCHES_ACTIONS } from '../../core/enums';
import { MatchData } from '../../core/interfaces';

export class SetMatches {
  static readonly type = MATCHES_ACTIONS.SET_MATCHES;

  constructor(public payload: MatchData[]) {
  }
}
