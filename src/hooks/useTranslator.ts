import { useReducer } from 'react'
import {
  ActionType,
  type Action,
  type AppState,
  type Language,
  type FromLanguage,
} from '../types.d'
import { AUTO_LANGUAGE } from '../config'

const initialState: AppState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
  autoTyping: false,
}

function reducer(state: AppState, action: Action): AppState {
  const { type } = action

  const newState = { ...state }

  switch (type) {
    case ActionType.SWITCH_LANGUAGE:
      // No se permite AUTO en ToLanguage
      if (state.fromLanguage !== AUTO_LANGUAGE) {
        newState.fromLanguage = state.toLanguage
        newState.toLanguage = state.fromLanguage
        newState.loading = state.fromText !== ''
      }
      break

    case ActionType.SET_FROMLANGUAGE:
      if (state.fromLanguage === action.payload) {
        break
      }
      newState.fromLanguage = action.payload
      newState.result = state.autoTyping ? '' : state.result
      newState.loading = state.fromText !== ''

      // Si ambos son iguales intercambialos siempre que no sea 'auto'
      if (
        action.payload !== AUTO_LANGUAGE &&
        state.toLanguage === action.payload
      ) {
        newState.toLanguage = state.fromLanguage as Language
      }
      break

    case ActionType.SET_TOLANGUAGE:
      if (state.toLanguage === action.payload) {
        break
      }
      newState.toLanguage = action.payload
      newState.result = state.autoTyping ? '' : state.result
      newState.loading = state.fromText !== ''

      // Si ambos son iguales intercambialos
      if (state.fromLanguage === action.payload) {
        newState.fromLanguage = state.toLanguage
      }
      break

    case ActionType.SET_FROMTEXT:
      if (state.fromText === action.payload) {
        break
      }
      newState.fromText = action.payload
      newState.result = state.autoTyping ? '' : state.result

      newState.loading = action.payload !== ''
      break

    case ActionType.SET_RESULT:
      newState.result = action.payload
      newState.loading = false
      break

    case ActionType.TOGGLE_AUTO_TYPING:
      newState.autoTyping = !state.autoTyping
      break
    default:
      console.warn('Reducer ha cogido una accion no conocida:', type)
  }

  return newState
}

export function useTranslator() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const switchLanguages = () => {
    dispatch({ type: ActionType.SWITCH_LANGUAGE })
  }
  const setFromLanguage = (lang: FromLanguage) => {
    dispatch({ type: ActionType.SET_FROMLANGUAGE, payload: lang })
  }
  const setToLanguage = (lang: Language) => {
    dispatch({ type: ActionType.SET_TOLANGUAGE, payload: lang })
  }
  const setFromText = (text: string) => {
    dispatch({ type: ActionType.SET_FROMTEXT, payload: text })
  }
  const setResult = (text: string) => {
    dispatch({ type: ActionType.SET_RESULT, payload: text })
  }
  const toggleAutoTyping = () => {
    dispatch({ type: ActionType.TOGGLE_AUTO_TYPING })
  }

  return {
    state,
    switchLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    toggleAutoTyping,
  }
}
