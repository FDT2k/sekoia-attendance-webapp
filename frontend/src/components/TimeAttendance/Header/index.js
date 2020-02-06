import { Button, Icon, Layout } from 'antd';
import Clock from 'components/Widgets/Clock';
import React from 'react';
import logo from 'resources/logo-white.svg';
import './Header.css';

export default props => {

  const handleVisibility = props.handleVisibility
  return (
    <Layout.Header className="header">

      <div className="logo">
        <img src={logo} />
      </div>

      <div className="title">Pointage pour la présence</div>

      <div className="extra">
        <Button onTouchStart={handleVisibility} onTouchEnd={handleVisibility} key="showPresents">Afficher <Icon type="user" /></Button>
        <Clock key="clock" />
      </div>
    </Layout.Header>
  )
}
