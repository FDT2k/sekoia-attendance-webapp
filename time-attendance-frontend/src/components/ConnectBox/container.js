/*

Links the subject form to the redux store

*/

import React, {Component} from 'react';
import _ from 'lodash'

export default (Composed,_defaultProps={}) =>{

  class Container extends Component{

    state={
      loading:false,
      error:false
    }

    handleSubmit(values){
      console.log(values)
      this.props.authenticate(values).then(
        result=>{
          console.log(result)

            localStorage.setItem('sekoia_conf',JSON.stringify(_.omit(values,['odoo_password'])))
        }
      );
    }

    render(){
      return (
        <React.Fragment>

          { this.state.loading && "Loading"}

          { !this.state.loading  && !this.state.error && <Composed
            handleSubmit={this.handleSubmit.bind(this)}

          />}
        </React.Fragment>
      );
    }
  }
  Container.defaultProps = _defaultProps
  return Container
}
