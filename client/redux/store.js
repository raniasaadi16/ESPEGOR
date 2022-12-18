import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import reducers from './reducers'



const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const store = createStore(reducers, bindMiddleware([thunk]))
  return store
}

export const wrapper = createWrapper(makeStore, { debug: true })
