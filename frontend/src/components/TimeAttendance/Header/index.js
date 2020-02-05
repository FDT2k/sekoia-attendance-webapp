import React, { Component } from 'react';
import { PageHeader,Button } from 'antd';
import Clock from 'components/Widgets/Clock';
import './Header.css';
import { Layout }                       from 'antd';

export default props => {

  const handleVisibility = props.handleVisibility
    return (
      <Layout.Header style={{ zIndex: 1, width: '100%', background: 'none', color:'white' }}>

        <PageHeader
            title="Sekoia"
            subTitle="Pointage pour la présence"
            style={{
              backgroundColor:'#0AABB5',
              marginTop: '20px',
              color:'white'
            }}
            extra={[
              <Button style={{backgroundColor:'rgba(0,0,0,0.1)',color:'white',border:'0px', paddingRight:'20px;'}} onTouchStart={handleVisibility} onTouchEnd={handleVisibility} key="showPresents">Afficher les présents</Button>,
              <Clock key="clock" />
            ]}
        />
      </Layout.Header>

    )
}
