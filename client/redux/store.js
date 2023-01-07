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

export const makeStore = ({isServer}) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducers, bindMiddleware([thunk]));
} else {
    //If it's on client side, create a store which will persist
    const { persistStore, persistReducer, autoRehydrate } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
        key: "nextjs",
        whitelist: ["auth","cart"], // only counter will be persisted, add other reducers if needed
        storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducers); // Create a new reducer with our existing reducer

    const store = createStore(
        persistedReducer,
        {},
        bindMiddleware([thunk])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
}
  // const store = createStore(reducers, bindMiddleware([thunk]))
  // return store
}

export const wrapper = createWrapper(makeStore, { debug: true })
