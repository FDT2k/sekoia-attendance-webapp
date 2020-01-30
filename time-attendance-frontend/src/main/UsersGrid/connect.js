/*

Create a connect functon that bind the Auth Reducer

*/

import { connect } from 'react-redux';

import {get_users} from '../../redux/Users/actions'
import {check_token} from '../../redux/Auth/actions'


// connect the state to the props
const mapStateToProps = (state)=>{
  return {
    users: state.users.list

  }
}

// bind the actions
const mapDispatchToProps = {get_users,check_token};

export default connect(mapStateToProps, mapDispatchToProps);
