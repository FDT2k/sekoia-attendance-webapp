import React                            from 'react';

import {Provider}                       from 'react-redux'
import store                            from './redux'

import TimeAttendance                   from 'components/TimeAttendance'
import {check_token,load_stored_config} from 'redux/Auth/actions'

import 'App.css';


// initialize some stuff in the store from localstorage (could be replaced by a redux-persist store but it's crap)
store.dispatch(load_stored_config())
store.dispatch(check_token())


function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <TimeAttendance/>
      </Provider>
    </React.Fragment>
  );
}

export default App;
