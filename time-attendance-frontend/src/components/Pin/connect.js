/*

Create a connect functon that bind the Auth Reducer

*/

import { connect } from 'react-redux';

import { toggle } from '../../redux/Users/actions'


// connect the state to the props
const mapStateToProps = (state)=>{
  return {

  }
}

// bind the actions
const mapDispatchToProps = {toggle};

export default connect(null, mapDispatchToProps);
