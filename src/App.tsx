import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Translator } from './components/Translator'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Translator />
      <Footer title='Traductor con ChatGPT' subtitle='Clon del Google Translator usando la API de ChatGPT' debugInfo={''}/>
    </>
  )
}

export default App
