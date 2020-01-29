/*

Create a connect functon that bind the Auth Reducer

*/

import { connect } from 'react-redux';

import {authenticate,load_stored_config} from '../../redux/Auth/actions'


// connect the state to the props
const mapStateToProps = (state)=>{
  return {
    auth: state.auth,

  }
}

// bind the actions
const mapDispatchToProps = {authenticate,load_stored_config};

export default connect(mapStateToProps, mapDispatchToProps);
