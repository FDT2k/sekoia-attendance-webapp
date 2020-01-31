import React                            from 'react';
import { Layout }                       from 'antd';

import Header                           from 'main/Header';
import UsersGrid                        from 'main/UsersGrid';
import ConnectBox                       from '../ConnectBox';

import {check_token,load_stored_config} from 'redux/Auth/actions'

export default props => {

  return  (
    <React.Fragment>

        <Layout className="App">
          <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'none' }}>
            <Header />
          </Layout.Header>
          <Layout.Content style={{ padding: '0 50px', marginTop: 64 }}>
            <UsersGrid/>
          </Layout.Content>
        </Layout>

        <ConnectBox/>

    </React.Fragment>
  )

}
