import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './config'

export interface AppState {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
  autoTyping: boolean
}

export enum ActionType {
  SWITCH_LANGUAGE = 'SWITCH_LANGUAGE',
  SET_FROMLANGUAGE = 'SET_FROMLANGUAGE',
  SET_TOLANGUAGE = 'SET_TOLANGUAGE',
  SET_FROMTEXT = 'SET_FROMTEXT',
  SET_RESULT = 'SET_RESULT',
  TOGGLE_AUTO_TYPING = 'TOGGLE_AUTO_TYPING',
}

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE

export type FromLanguage = Language | AutoLanguage

export type Action =
  | { type: ActionType.SWITCH_LANGUAGE }
  | { type: ActionType.SET_FROMLANGUAGE; payload: FromLanguage }
  | { type: ActionType.SET_TOLANGUAGE; payload: Language }
  | { type: ActionType.SET_FROMTEXT; payload: string }
  | { type: ActionType.SET_RESULT; payload: string }
  | { type: ActionType.TOGGLE_AUTO_TYPING }
