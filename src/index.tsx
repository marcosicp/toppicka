import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from './redux/rootReducer';
import { Firebase, FirebaseContext } from './firebase/FirebaseContext';


const persistConfig = {
   key: 'root',
   blacklist: ['commentsStore'],
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store: any = createStore(persistedReducer, composeWithDevTools())
const persistor = persistStore(store)


ReactDOM.render(

  <React.StrictMode>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <FirebaseContext.Provider value={Firebase}>
               <App />
            </FirebaseContext.Provider>
         </PersistGate>
      </Provider>
   </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
