/*

Create a connect functon that bind the Auth Reducer

*/

import { connect } from 'react-redux';

import {authenticate} from '../../redux/Auth/actions'


// connect the state to the props
const mapStateToProps = (state)=>{
  return {
    auth: state.auth,

  }
}

// bind the actions
const mapDispatchToProps = {authenticate};

export default connect(mapStateToProps, mapDispatchToProps);
