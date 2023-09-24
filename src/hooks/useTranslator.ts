import { useReducer } from 'react'
import { ActionType, type Action, type AppState, type Language, type FromLanguage } from '../types.d'

const initialState: AppState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: AppState, action: Action): AppState {
  const { type } = action

  if (type === ActionType.SWITCH_LANGUAGE) {
    return {
      ...state,
      // SWITCH languages
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage === 'auto' ? 'es' : state.fromLanguage,
    }
  }
  if (type === ActionType.SET_FROMLANGUAGE) {
    return { ...state, fromLanguage: action.payload }
  }

  if (type === ActionType.SET_TOLANGUAGE) {
    return { ...state, toLanguage: action.payload }
  }

  if (type === ActionType.SET_FROMTEXT) {
    return { ...state, fromText: action.payload, loading: true, result: '' }
  }

  if (type === ActionType.SET_RESULT) {
    return { ...state, result: action.payload, loading: false }
  }

  console.warn('Reducer ha cogido una accion no conocida:', type)
  return state
}

export function useTranslator() {
  const [state,
    dispatch
  ] = useReducer(reducer, initialState)

  const switchLanguages = () => { dispatch({ type: ActionType.SWITCH_LANGUAGE }) }
  const setFromLanguage = (lang: FromLanguage) => { dispatch({ type: ActionType.SET_FROMLANGUAGE, payload: lang }) }
  const setToLanguage = (lang: Language) => { dispatch({ type: ActionType.SET_TOLANGUAGE, payload: lang }) }
  const setFromtext = (text: string) => { dispatch({ type: ActionType.SET_FROMTEXT, payload: text }) }
  const setResult = (text: string) => { dispatch({ type: ActionType.SET_RESULT, payload: text }) }

  return { state, switchLanguages, setFromLanguage, setToLanguage, setFromtext, setResult }
}
