import { useReducer } from 'react'
import '../styles/Translator.css'
import { type AppState, type Action } from '../types.d'
import { useTranslator } from '../hooks/useTranslator'

const initialState: AppState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: AppState, action: Action): AppState {
  const { type } = action

  if (type === 'SWITCH_LANGUAGE') {
    return {
      ...state,
      // SWITCH languages
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }
  }
  if (type === 'SET_FROMLANGUAGE') {
    return { ...state, fromLanguage: action.payload }
  }

  if (type === 'SET_TOLANGUAGE') {
    return { ...state, toLanguage: action.payload }
  }

  if (type === 'SET_FROMTEXT') {
    return { ...state, fromText: action.payload, loading: true, result: '' }
  }

  if (type === 'SET_RESULT') {
    return { ...state, result: action.payload, loading: false }
  }

  console.warn('Reducer ha cogido una accion no conocida:', type)
  return state
}

export function Translator() {
  const { state, switchLanguages, setFromLanguage } = useTranslator()

  const { fromLanguage, toLanguage } = state

  return (
    <>
      <header>
        <img src='/Translator.svg' />
        <h1>TRADUCTOR</h1>
      </header>
      <main>
        <h3>{fromLanguage}</h3>
        <button onClick={() => { switchLanguages() }}>Switch</button>
        <h3>{toLanguage}</h3>
        <button onClick={() => { setFromLanguage('es') }}>Cambiar a Español</button>
      </main>
    </>
  )
}
