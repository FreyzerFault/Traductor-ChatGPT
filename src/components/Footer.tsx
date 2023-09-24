import '../styles/Footer.css'
import { DEV_MODE } from '../config'

interface FooterProps {
  title: string
  subtitle: string
  debugInfo: object | string | number | boolean
}

export function Footer(props: FooterProps) {
  const { title, subtitle, debugInfo } = props
  return (
    <footer className='footer'>
      {DEV_MODE
        ? (
            JSON.stringify(debugInfo, null, 2)
          )
        : (
        <>
          <h4>
            {title} － <span>@daviduvidev</span>
          </h4>
          <h5>{subtitle}</h5>
        </>
          )}
    </footer>
  )
}
