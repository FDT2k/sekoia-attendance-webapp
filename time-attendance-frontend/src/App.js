import { Layout } from 'antd';
import React from 'react';
import './App.css';
import Header from './components/Header';
import UsersGrid from './components/UsersGrid';
import ConnectBox from './components/ConnectBox';
import { Route } from "wouter"; // routeur
import {Provider} from 'react-redux'
import store from './redux'

const users = [
  { id: 0, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 1, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 2, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 3, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 4, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 5, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 6, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 7, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 8, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 9, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 10, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 11, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 12, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 13, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
];

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
              <UsersGrid users={users} />
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
