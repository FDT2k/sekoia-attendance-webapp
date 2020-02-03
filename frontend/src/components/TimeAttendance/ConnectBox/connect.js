/*

Create a connect functon that bind the Auth Reducer

*/

import { connect } from 'react-redux';

import {authenticate,load_stored_config,check_token} from 'redux/Auth/actions'
import {get_users} from 'redux/Users/actions'


// connect the state to the props
const mapStateToProps = (state)=>{
  return {
    auth: state.auth,

  }
}

// bind the actions
const mapDispatchToProps = {authenticate,load_stored_config,check_token,get_users};

export default connect(mapStateToProps, mapDispatchToProps);
