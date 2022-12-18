import 'antd/dist/antd.css'
import { Router } from 'next/router'
import { useState } from 'react'
import Loading from '../components/layouts/global/Loading'
import Layout from '../components/layouts/Layout'
import { wrapper } from '../redux/store'
import '../styles/globals.css'
import Modal from '../components/offers/Modal'
import { useSelector } from 'react-redux'


function MyApp({ Component, pageProps }) {
  const [loading, setloading] = useState(false)
  const err = useSelector(state=> state.err.msg)

  Router.events.on('routeChangeStart', () => {
    setloading(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setloading(false)
  })

  const getLayout = Component.getLayout || ((page) => (
    <Layout>
      <Modal isOpen={err ? true : false} err={err} />
      {loading && <Loading/>}
      {page}
    </Layout>
  ))
  return (
    getLayout(<Component {...pageProps} />)
  )
}

export default wrapper.withRedux(MyApp)
