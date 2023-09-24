import { OpenAI } from 'openai'
import { type FromLanguage, type Language } from '../types'
import { type ChatCompletionMessageParam } from 'openai/resources/chat/index.mjs'
import { SUPPORTED_LANGUAGES } from '../config'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
// const apiKey = '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'

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })

const mock = false

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (mock) return 'Texto de prueba ... ' + text
  if (fromLanguage === toLanguage) return text

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content:
        'You are an AI that translates text.' +
        'You receive a text from the user.' +
        'Do not answer, just translate the text.' +
        'The original language is surrounded by `{{` and `}}`.' +
        'You can also receive {{auto}} which means that you have to detect the language.' +
        'The language you translate to is surrounded by `[[` and `]]`.',
    },
    {
      role: 'user',
      content: 'Hola mundo {{Español}} [[English]]',
    },
    {
      role: 'assistant',
      content: 'Hello World',
    },
    {
      role: 'user',
      content: 'How are you {{auto}} [[Deutsch]]',
    },
    {
      role: 'assistant',
      content: 'Wie geht es dir',
    },
    {
      role: 'user',
      content: 'Bon dia, com estas? {{Catalán}} [[Español]]',
    },
    {
      role: 'assistant',
      content: 'Buenos días, ¿cómo estás?',
    },
  ]

  const fromCode =
    fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: 'user',
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
  })

  if (
    !Array.isArray(chatCompletion.choices) ||
    chatCompletion.choices.length === 0 ||
    chatCompletion.choices[0].message?.content === null ||
    chatCompletion.choices[0].message?.content === undefined
  ) {
    throw new Error(
      'No se ha recibido ninguna respuesta de ChatGPT\n' +
        JSON.stringify(chatCompletion)
    )
  }
  return chatCompletion.choices[0].message.content
}
