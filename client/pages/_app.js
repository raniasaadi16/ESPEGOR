import 'antd/dist/antd.css'
import { Router } from 'next/router'
import { useState } from 'react'
import Loading from '../components/layouts/global/Loading'
import Layout from '../components/layouts/Layout'
import { makeStore, wrapper } from '../redux/store'
import '../styles/globals.css'
import { Provider, useSelector, useStore } from 'react-redux'
import Modal from '../components/layouts/global/ErrModal'
import { PersistGate } from "redux-persist/integration/react";


function MyApp({ Component, pageProps }) {
  const [loading, setloading] = useState(false)
  const err = useSelector(state=> state.err.msg)
  const stateLoading = useSelector(state => state.ui.loading)
  const store = useStore((state) => state)
  Router.events.on('routeChangeStart', () => {
    setloading(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setloading(false)
  })

  const getLayout = Component.getLayout || ((page) => (
    <Layout>
       <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>

        {err && <Modal isOpen={err ? true : false} err={err} />}
        {(loading || stateLoading) && <Loading/>}
        {page}
       </PersistGate>
    </Layout>

  ))
  return (
    getLayout(<Component {...pageProps} />)
  )
}

export default wrapper.withRedux(MyApp)
