import '../styles/globals.css'
import '../styles/admin.css'
import CarrinhoProvider from '../context/Carrinho'

function MyApp({ Component, pageProps }) {
  return (
    <CarrinhoProvider>
      <Component {...pageProps} />
    </CarrinhoProvider>
  )
}

export default MyApp
