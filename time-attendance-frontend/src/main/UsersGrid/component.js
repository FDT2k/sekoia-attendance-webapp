import React, { Component, Fragment } from 'react';
import { Col, Row } from 'antd';
import PresenceWindow from '../../presence/PresenceWindow';
import User from '../User';
import './style.css';

export default class UsersGrid extends Component {

  state = { isModalVisible: false, selectedUser: null };

  showModal = user => {
    this.setState({
      selectedUser: user,
      isModalVisible: true,
    });
  };

  handleClose = e => {
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    const {isModalVisible,selectedUser} = this.state;
    const {users} = this.props;
    return (
      <Fragment>
        <PresenceWindow
          visible={isModalVisible}
          handleClose={this.handleClose}
          user={selectedUser}
        />
        <Row type="flex">
          {users.map(user => (
            <Col key={user.id} >
              <User user={user} onClick={() => this.showModal(user)} />
            </Col>
          ))}
        </Row>
      </Fragment>
    )
  }
}
