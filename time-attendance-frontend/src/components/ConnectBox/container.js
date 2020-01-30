/*

Links the subject form to the redux store

*/

import React, {Component} from 'react';
import _ from 'lodash'

export default (Composed,_defaultProps={}) =>{

  class Container extends Component{
    constructor(props){
      super(props)
      this.state={
        loading:false,
        error:false,
        formValues:{
          api_url: 'http://192.168.13.27:3001',
          host: '192.168.13.250',
          port: '8069',
          database: 'Sekoia4',
          username: 'support@sekoia.ch',
          password: '',
        }
      }
    }


    componentDidMount(){
      let values = localStorage.getItem('config');
      console.log(values)
      if(typeof values !== undefined && values !== null){
        console.log(values)
        const newState= {formValues:{...this.state.formValues,...JSON.parse(values)}};
        console.log(newState)
        this.setState({formValues:newState.formValues})
      }
    }

    handleSubmit(values){
      this.props.authenticate(values).then(
        result=>{
          localStorage.setItem('config',JSON.stringify(_.omit(values,['password'])))
          localStorage.setItem('token',result.token)
          this.props.load_stored_config();

      //    window.location.href='/app'
        }
      );
    }

    render(){

      return (
        <React.Fragment>
          { this.state.loading && "Loading"}
          { !this.state.loading  && !this.state.error && <Composed
            handleSubmit={this.handleSubmit.bind(this)}
            formValues={this.state.formValues}
          />}
        </React.Fragment>
      );
    }
  }
  Container.defaultProps = _defaultProps
  return Container
}
