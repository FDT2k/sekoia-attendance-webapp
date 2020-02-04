import React, { Component } from 'react';
import { PageHeader,Button } from 'antd';
import Clock from 'components/Widgets/Clock';
import './Header.css';
import { Layout }                       from 'antd';

export default props => {

  const handleVisibility = props.handleVisibility
    return (
      <Layout.Header style={{ zIndex: 1, width: '100%', background: 'none' }}>

        <PageHeader
            style={{
                border: '1px solid black',
            }}
            title="Sekoia"
            subTitle="Pointage pour la présence"
            extra={[
              <Button onTouchStart={handleVisibility} onTouchEnd={handleVisibility} key="showPresents">Afficher les présents</Button>,
              <Clock key="clock" />
            ]}
        />
      </Layout.Header>

    )
}
