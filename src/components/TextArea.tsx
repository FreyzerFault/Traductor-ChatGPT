/* eslint-disable @typescript-eslint/indent */
import { Form } from 'react-bootstrap'

interface baseProps {
  value: string
  onChange: (text: string) => void
}

interface fromProps {
  loading?: boolean
  type: 'from'
}
interface toProps {
  loading: boolean
  type: 'to'
}

type Props = baseProps & (fromProps | toProps)

export function TextArea({ loading, type, value, onChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      className={'textarea ' + type}
      onChange={handleChange}
      as='textarea'
      disabled={type === 'to'}
      autoFocus={type === 'from'}
      value={value}
      placeholder={
        type === 'from'
          ? 'Escribe aquí...'
          : loading
          ? 'Traduciendo...'
          : 'Traducción'
      }
    />
  )
}
