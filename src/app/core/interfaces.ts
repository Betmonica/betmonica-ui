import { BUTTON_SIZE, BUTTON_TYPES } from './enums';

export interface Environment {
  production: boolean;
  apiUrl: string;
}

export interface Response<T> {
  data: T,
  error?: any,
  success: boolean
}

export interface UserData {
  _id: string;
  email: string;
  balance: number;
}

export interface IAction<T> {
  type: string;
  payload: T;
}

export interface UserDataResponse {
  user: UserData;
}

export interface TokenData {
  accessToken: string;
  expiredIn: number;
}

export interface AuthorizationResponse {
  tokenData: TokenData,
  user: UserData;
}

export interface BalanceResponse {
  balance: number;
}

export interface ButtonData {
  type?: BUTTON_TYPES;
  size?: BUTTON_SIZE;
  borderRadius?: number;
}

export interface MatchData {
  id: string;
  startDate: Date;
  slug: string;
  isLive: boolean;
  countMaps: number;
  tournament: string;
  tournamentId: string;
  tournamentLogo: string;
  teamWonId: string;
  homeTeam: TeamData;
  awayTeam: TeamData;
  status: string;
}

export interface MatchesResponse {
  matches: MatchData[];
}

export interface TeamData {
  odd?: number;
  id: string;
  name: string;
  imageUrl: string;
  score?: number;
}

export interface IMatchesState {
  live: MatchData[];
  upcoming: MatchData[];
}
