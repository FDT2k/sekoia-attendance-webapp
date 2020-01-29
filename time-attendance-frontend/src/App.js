import { Layout } from 'antd';
import React from 'react';
import './App.css';
import Header from './components/Header';
import UsersGrid from './components/UsersGrid';
import ConnectBox from './components/ConnectBox';
import { Route } from "wouter"; // routeur
import {Provider} from 'react-redux'
import store from './redux'

import {check_token,load_stored_config} from './redux/Auth/actions'


// initialize some stuff in the store
store.dispatch(load_stored_config())
//const tok = localStorage.getItem('token')
//if( tok !== undefined && tok !==null){
  store.dispatch(check_token())
//}


function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Route path="/app">
          <Layout className="App">
            <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'none' }}>
              <Header />
            </Layout.Header>
            <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
              <UsersGrid/>
            </Layout.Content>
          </Layout>
        </Route>
        <Route path="/">
          <ConnectBox/>
        </Route>
      </Provider>
    </React.Fragment>
  );
}

export default App;
