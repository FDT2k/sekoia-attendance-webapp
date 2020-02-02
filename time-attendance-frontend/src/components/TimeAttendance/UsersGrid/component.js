import React, { useState, Fragment } from 'react';
import { Col, Row } from 'antd';
import PresenceWindow from 'components/TimeAttendance/PresenceWindow';
import User from 'components/TimeAttendance/UsersGrid/User';
import './style.css';


export default ({users}) => {

  const [ isModalVisible, setModalVisible ] = useState(false)
  const [ selectedUser, selectUser ] = useState(null)

  const handleClose = e => setModalVisible(false)

  const showModal = user => {
    selectUser(user);
    setModalVisible(true);
  }

  return (
    <Fragment>
      <PresenceWindow
        visible={isModalVisible}
        handleClose={handleClose}
        user={selectedUser}
      />
      <Row type="flex">
        {users && users.length >0 && users.map(user => (
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
