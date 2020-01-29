import React,{Component} from 'react'
import { Row,Layout } from 'antd';
import ConnectForm from './ConnectForm'
import _ from 'lodash';

import makeAPI from '../../API'

class ConnectBox extends Component{

  state = {

    formValues:{
      api_url: '192.168.13.27',
      host: '192.168.13.250',
      port: '8069',
      database: 'Sekoia4',
      username: 'support@sekoia.ch',
      password: '',

    }
  }

  componentDidMount(){
    const stored_conf =  localStorage.getItem('sekoia_conf')
    if( ! stored_conf ){
      console.warn('no stored conf found - using default')
    }else{

      console.log(JSON.parse(stored_conf))
    /*  const newState = {...this.state.formValues, ...JSON.parse(stored_conf) }

      this.setState({formValues:newState})*/
    }
  }

  handleSubmit = (values,form)=>{

    localStorage.setItem('sekoia_conf',JSON.stringify(_.omit(values,['odoo_password'])))
    this.props.handleSubmit(values,form)
  }

  render(){
    const {formValues} = this.state
    const {handleSubmit} = this.props
    return (
      <Layout className="connect-box">
        <h1>Configuration du client</h1>
        <Row type="flex" justify="center" align="top">
          <ConnectForm initialValues={formValues} handleSubmit={handleSubmit}/>
        </Row>
      </Layout>
    )
  }


}


export default ConnectBox
