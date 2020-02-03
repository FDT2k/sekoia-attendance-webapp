import React,{Component} from 'react'
import { Row,Layout } from 'antd';
import ConnectForm from './ConnectForm'

class ConnectBox extends Component{


  render(){
    const {handleSubmit,formValues} = this.props
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
