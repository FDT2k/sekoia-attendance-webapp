import React , {useState}                           from 'react';
import { Layout }                       from 'antd';

import Header                           from 'components/TimeAttendance/Header';
import UsersGrid                        from 'components/TimeAttendance/UsersGrid';
import ConnectBox                       from 'components/TimeAttendance/ConnectBox';

import {check_token,load_stored_config} from 'redux/Auth/actions'
import { Route }                        from "wouter"; // routeur

export default props => {
  const [filtered,setFiltered] = useState(false)

  const toggleState = _=>{
    setFiltered(!filtered)
  }

  return  (
    <React.Fragment>
        <Route path="/">
        <Layout className="App">
            <Header handleVisibility={toggleState}/>
          <Layout.Content style={{ padding: '0 50px', marginTop: 64}}>
            <UsersGrid displayOnlyPresents={filtered}/>
          </Layout.Content>
        </Layout>
        </Route>
        <Route path="/configure">
          <ConnectBox/>
        </Route>

    </React.Fragment>
  )

}
