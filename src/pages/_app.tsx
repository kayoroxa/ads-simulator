import '../styles/reset.css'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  const contextProps = {}
  return <Component {...pageProps} {...contextProps} />
}
