export enum LOCALSTORAGE_KEYS {
	ACCESS_TOKEN = 'accessToken'
}

export enum MODAL_IDS {
	LOGIN_MODAL = 'loginModal',
	REGISTRATION_MODAL = 'registrationModal',
	PLACE_BET_MODAL = 'placeBetModal'
}

export enum MATCH_STATUSES {
	FINISHED = 'finished',
	UPCOMING = 'upcoming', // upcoming includes "live" and "upcoming" matches
	CANCELLED = 'cancelled'
}

export enum BET_STATUSES {
	UPCOMING = 'upcoming',
	WON = 'won',
	LOSE = 'lost',
	CANCELLED = 'cancelled'
}

export enum USER_ACTIONS {
	SET_USER_DATA = '[USER] setUserData',
	RESET_USER_DATA = '[USER] resetUserData',
	SET_BALANCE = '[USER] setBalance'
}

export enum MATCHES_ACTIONS {
	SET_MATCHES = '[MATCHES] setMatches'
}

export enum BETS_ACTIONS {
	SET_BETS = '[BETS] setBets'
}

export enum BUTTON_TYPES {
	GREEN = 'green',
	RED = 'red'
}

export enum BUTTON_SIZE {
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
	WIDE = 'wide'
}

export enum BACKEND_ERROR_TYPES {
	VALIDATION = 'Validation',
	UNEXPECTED = 'Unexpected',
	AUTHENTICATE = 'Authenticate',
	TOKEN_EXPIRED_ERROR = 'TokenExpiredError'
}
