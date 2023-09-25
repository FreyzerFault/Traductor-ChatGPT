import { afterEach, describe, expect, it, vi } from 'vitest'
import { translate } from '../services/translate'
import { type FromLanguage, type Language } from '../types'

describe('App works as expected', async () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should get an output when translated', async () => {
    const translator = {
      fromLanguage: 'es' as FromLanguage,
      toLanguage: 'en' as Language,
      text: 'Hola mundo',
      translate,
    }

    const { fromLanguage, toLanguage, text } = translator

    const spy = vi.spyOn(translator, 'translate')

    let result = await translator.translate({
      fromLanguage,
      toLanguage,
      text,
    })
    expect(result).toEqual('Texto de prueba ... ' + text)

    expect(spy).toHaveBeenCalledTimes(1)

    // MOCK
    const mockText = 'MOCK TEXT'
    spy.mockImplementationOnce(async () => mockText)
    result = await translator.translate({
      fromLanguage,
      toLanguage,
      text,
    })
    expect(result).toEqual(mockText)
  })

  it('should get with a mock', () => {
    const mock = vi.fn().mockImplementation(translate)
    mock()
      .then((result: string) => {
        expect(result).toEqual('Texto de prueba ... ')
      })
      .catch(() => {})

    expect(mock).toHaveBeenCalledTimes(1)

    const mockText = 'MOCK TEXT'
    mock.mockImplementationOnce(() => mockText)
    expect(mock()).toEqual(mockText)

    expect(mock).toHaveBeenCalledTimes(2)
  })

  // const user = userEvent.setup()
  // const app = render(<App />)

  // const textareaFrom = app.getByPlaceholderText('Traducción')
  // const translateButton = app.getAllByRole('button')[1]
  // expect(translateButton).toBeTruthy()

  // await user.type(textareaFrom, 'Hola mundo')
  // await user.click(translateButton)

  // const result = await app.findByDisplayValue(/Texto de prueba ... /i, {}, { timeout: 5000 })

  // expect(result).toBeTruthy()
})
