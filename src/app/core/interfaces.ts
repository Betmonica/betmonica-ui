import {
	BET_STATUSES,
	BUTTON_SIZE,
	BUTTON_TYPES,
	MATCH_STATUSES
} from './enums';

export interface Environment {
	production: boolean;
	apiUrl: string;
}

export interface Response<T> {
	data: T;
	error?: Error;
	success: boolean;
}

export interface Error {
	type: string;
	message: string;
}

export interface IAction<T> {
	type: string;
	payload: T;
}

export interface TokenData {
	accessToken: string;
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
	status: MATCH_STATUSES;
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

export interface PlaceBetModalData {
	match: MatchData;
	selectedTeamId: string;
}

export interface Bet {
	id: string;
	matchId: string;
	teamId: string;
	betAmount: number;
	betOdd: number;
	status: BET_STATUSES;
}

export interface BetsResponse {
	bets: BetResponse[];
}

export interface BetState {
	bet: Bet;
	match: MatchData;
}

export interface BetResponse {
	bet: Bet;
	match: MatchData;
}

export interface DropdownItem {
	name: string;
	onClick: Function;
}

export interface MatchWithBets {
	match: MatchData;
	bets: Bet[];
}

export interface MatchWithBetsAndDates {
	date: string;
	matchesWithBets: MatchWithBets[];
}

export interface CurrentMatchBetInfo {
	homeTeamBet: number;
	awayTeamBet: number;
}

export interface UserData extends JwtData {
	id: string;
	email: string;
	username: string;
	balance?: number;
}

export interface JwtData {
	iat: number;
	exp: number;
}
