import 'tailwindcss/tailwind.css'
import Header from '../components/core/Header'

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Header/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
