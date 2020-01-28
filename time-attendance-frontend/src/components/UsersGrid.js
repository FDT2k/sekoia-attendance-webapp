import React, { Component, Fragment } from 'react';
import { Col, Row } from 'antd';
import PresenceWindow from './PresenceWindow';
import User from './User';
import './UsersGrid.css';

export default class UsersGrid extends Component {

  state = { visible: false, user: null };

  showModal = user => {
    this.setState({
      user: user,
      visible: true,
    });
  };

  handleClose = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Fragment>
        <PresenceWindow
          visible={this.state.visible}
          handleClose={this.handleClose}
          user={this.state.user}
        />
        <Row type="flex">
          {this.props.users.map(user => (
            <Col key={user.id} >
              <User user={user} onClick={() => this.showModal(user)} />
            </Col>
          ))}
        </Row>
      </Fragment>
    )
  }
}