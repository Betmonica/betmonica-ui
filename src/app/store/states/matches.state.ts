import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetMatches } from '../actions/matches.actions';
import { IAction, MatchData } from '../../core/interfaces';

@State<MatchData[]>({
  name: 'matches',
  defaults: []
})
@Injectable()
export class MatchesState {
  @Selector()
  static liveMatches(state: MatchData[]): MatchData[] {
    return state.filter((match: MatchData) => match.isLive);
  }

  @Selector()
  static upcomingMatches(state: MatchData[]): MatchData[] {
    return state.filter((match: MatchData) => !match.isLive);
  }

  @Action(SetMatches)
  private setMatches(ctx: StateContext<MatchData[]>, action: IAction<MatchData[]>): MatchData[] {
    const matches: MatchData[] = action.payload;
    return ctx.setState(matches);
  }
}
