import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../config'
import { type Language, type FromLanguage } from '../types'
import { type FC } from 'react'

interface FromProps {
  type: 'from'
  value: FromLanguage
  onChange: (language: FromLanguage) => void
}
interface ToProps {
  type: 'to'
  value: Language
  onChange: (language: Language) => void
}

type Props = FromProps | ToProps

// interface Props {
//   initialValue: FromLanguage | Language
//   onChange: (lang: Language) => void
// }

export const LanguageSelector: FC<Props> = ({ type, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      value={value}
      onChange={handleChange}
      aria-label='Selecciona el Idioma'
    >
      {type === 'from' && (
        <option value={AUTO_LANGUAGE}>Detectar Idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([langCode, langLabel]) => (
        <option key={langCode} value={langCode}>
          {langLabel}
        </option>
      ))}
    </Form.Select>
  )
}
