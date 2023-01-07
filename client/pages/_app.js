import 'antd/dist/antd.css'
import { Router } from 'next/router'
import { useState } from 'react'
import Loading from '../components/layouts/global/Loading'
import Layout from '../components/layouts/Layout'
import { wrapper } from '../redux/store'
import '../styles/globals.css'
import { useSelector } from 'react-redux'
import Modal from '../components/layouts/global/ErrModal'


function MyApp({ Component, pageProps }) {
  const [loading, setloading] = useState(false)
  const err = useSelector(state=> state.err.msg)
  const stateLoading = useSelector(state => state.ui.loading)

  Router.events.on('routeChangeStart', () => {
    setloading(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setloading(false)
  })

  const getLayout = Component.getLayout || ((page) => (
    <Layout>
        {err && <Modal isOpen={err ? true : false} err={err} />}
        {(loading || stateLoading) && <Loading/>}
        {page}
    </Layout>

  ))
  return (
    getLayout(<Component {...pageProps} />)
  )
}

export default wrapper.withRedux(MyApp)
