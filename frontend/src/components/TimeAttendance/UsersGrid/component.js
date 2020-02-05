import { Col, Row } from 'antd';
import PresenceWindow from 'components/TimeAttendance/PresenceWindow';
import User from 'components/TimeAttendance/UsersGrid/User';
import React, { Fragment, useState } from 'react';
import './style.css';


export default ({ users }) => {

  const [selectedUser, selectUser] = useState(null)

  const showModal = user => selectUser(user);
  const afterClose = e => selectUser(null);

  return (
    <Fragment>
      {selectedUser && <PresenceWindow
        afterClose={afterClose}
        user={selectedUser}
      />}
      <Row type="flex">
        {users && users.length > 0 && users.map(user => (
          <Col key={user.id} >
            <User user={user} onClick={() => showModal(user)} />
          </Col>
        ))}
      </Row>
    </Fragment>
  )

}
/*
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
    const {users} = this.props ;
    return (
      <Fragment>
        <PresenceWindow
          visible={isModalVisible}
          handleClose={this.handleClose}
          user={selectedUser}
        />
        <Row type="flex">
          {users && users.length >0 && users.map(user => (
            <Col key={user.id} >
              <User user={user} onClick={() => this.showModal(user)} />
            </Col>
          ))}
        </Row>
      </Fragment>
    )
  }
}
*/
