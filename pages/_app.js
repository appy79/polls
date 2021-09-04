import 'tailwindcss/tailwind.css'
import Header from '../components/core/Header'
import {Provider} from "next-auth/client"


function MyApp({ Component, pageProps }) {
  return(
    <Provider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </Provider>
  ) 
}

export default MyApp
