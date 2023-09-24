import '../styles/Translator.css'

import { AUTO_LANGUAGE } from '../config'

import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { LanguageSelector } from './LanguageSelector'
import { TextArea } from './TextArea'

import { useCallback, useEffect } from 'react'
import { useTranslator } from '../hooks/useTranslator'
import { useDebounce } from '../hooks/useDebounce'

import { translate } from '../services/translate'

export function Translator() {
  const {
    state,
    switchLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    toggleAutoTyping,
  } = useTranslator()

  const { fromLanguage, toLanguage, fromText, result, loading, autoTyping } =
    state

  const debouncedFromText = useDebounce(fromText, 1000)

  const doTranslation = useCallback(() => {
    if (fromText === '') return
    translate({ fromLanguage, toLanguage, text: fromText })
      .then((text) => {
        setResult(text)
      })
      .catch((e) => {
        console.error(e)
        setResult('Error')
      })
  }, [fromText, fromLanguage, toLanguage])

  useEffect(() => {
    if (autoTyping) {
      doTranslation()
    }
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <>
      <header>
        <img src='/Translator.svg' />
        <h1>TRADUCTOR</h1>
        <img src='/Translator.svg' />
      </header>
      <main>
        <Container>
          <Row>
            {/* FROM */}
            <Col>
              <Stack gap={1}>
                <LanguageSelector
                  type='from'
                  value={fromLanguage}
                  onChange={setFromLanguage}
                />
                <TextArea type='from' value={fromText} onChange={setFromText} />
              </Stack>
            </Col>

            {/* BOTON SWITCH */}
            <Col md='auto'>
              <Stack gap={1}>
                <Button
                  className='switch-button'
                  variant='link'
                  disabled={fromLanguage === AUTO_LANGUAGE}
                  onClick={() => {
                    switchLanguages()
                  }}
                >
                  <img src='/Switch.svg' alt='Switch Icon' />
                </Button>
                <Button
                  className='translate-button'
                  variant='link'
                  onClick={() => {
                    doTranslation()
                  }}
                >
                  <img src='/play.svg' alt='translate' />
                </Button>
                <Button
                  className='toggle-auto-typing-button'
                  variant='link'
                  onClick={() => {
                    toggleAutoTyping()
                  }}
                >
                  <img
                    src={autoTyping ? '/toggle-on.svg' : '/toggle-off.svg'}
                    alt='translate'
                  />
                </Button>
              </Stack>
            </Col>

            {/* TO */}
            <Col>
              <Stack gap={1}>
                <LanguageSelector
                  type='to'
                  value={toLanguage}
                  onChange={setToLanguage}
                />
                <TextArea
                  type='to'
                  loading={loading}
                  value={result}
                  onChange={setResult}
                />
              </Stack>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}
