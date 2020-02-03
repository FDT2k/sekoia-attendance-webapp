import React from 'react';
import { Alert } from 'antd';
import {serializeError} from 'serialize-error'

export default (props)=>{
  const {error}= props
  let _props = typeof (error) == 'Error' ? serializeError(error) : error;
  console.log('ERR',props)
  return  <Alert
      message={_props.message}
      description={_props.description}
      type="error"

    />
}
