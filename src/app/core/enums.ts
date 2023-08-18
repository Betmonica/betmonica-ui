export enum LOCALSTORAGE_KEYS {
  ACCESS_TOKEN = 'accessToken'
}

export enum MODAL_IDS {
  LOGIN_MODAL = 'loginModal',
  REGISTRATION_MODAL = 'registrationModal',
}

export enum MATCH_STATUSES {
  FINISHED = 'finished',
  UPCOMING = 'upcoming', // upcoming includes "live" and "upcoming" matches
  CANCELLED = 'cancelled'
}

export enum BET_STATUSES {
  UPCOMING = 'upcoming',
  WON = 'won',
  LOSE = 'lose'
}

export enum USER_ACTIONS {
  SET_USER_DATA = '[USER] setUserData',
  RESET_USER_DATA = '[USER] resetUserData',
  SET_BALANCE = '[USER] setBalance'
}

export enum MATCHES_ACTIONS {
  SET_MATCHES = '[MATCHES] setMatches',
}

export enum BUTTON_TYPES {
  GREEN = 'green',
}

export enum BUTTON_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}
