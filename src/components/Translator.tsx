import '../styles/Translator.css'
import { useTranslator } from '../hooks/useTranslator'

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
