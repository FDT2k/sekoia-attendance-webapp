/*

Links the subject form to the redux store

*/

import React, {Component} from 'react';
import _ from 'lodash'
/*const users = [
  { id: 0, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 1, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 2, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 3, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 4, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 5, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 6, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 7, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 8, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 9, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 10, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 11, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 12, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
  { id: 13, firstname: 'Quentin', lastname: 'Queloz', picture: "", present: false },
];
*/
export default (Composed,_defaultProps={}) =>{

  class Container extends Component{
    constructor(props){
      super(props)
      this.state = {loading:false}
    }


    componentDidMount(){
      this.props.check_token().then(
        result => this.props.get_users()
      )

    }

    handleSubmit(values){

    }

    render(){
      const {users} = this.props;
      return (
        <React.Fragment>
          { this.state.loading && "Loading"}
          { !this.state.loading  && !this.state.error && <Composed
            users={users}
          />}
        </React.Fragment>
      );
    }
  }
  Container.defaultProps = _defaultProps
  return Container
}
