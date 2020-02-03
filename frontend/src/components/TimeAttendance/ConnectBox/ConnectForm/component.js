import React from 'react';

import {useFormik} from 'formik';
import { Row,Col } from 'antd';



const makeField = formik => (key,type="text",bind,label) => {

  const _bound =  bind ? bind: key;
  const _label = label ? label: key;
  return  (
      <React.Fragment key={key}>
        <Row type="flex">
          <Col span={12}>
            <label htmlFor="email">{_label}</label>
          </Col>
          <Col span={12}>
            <input
              name={key}
              onChange={formik.handleChange}
              value={formik.values[_bound]}
              type={type}
            />
          </Col>
        </Row>
      </React.Fragment>
      )
}


const ConnectForm = ({initialValues,handleSubmit}) => {
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    enableReinitialize:true
  });

  const createField = makeField(formik)

  return (
    <form onSubmit={formik.handleSubmit}>
      {
        Object.keys(initialValues).map(item=> createField(item,item === 'password' ? 'password': 'text'))
      }
      <button type="submit">Submit</button>
    </form>
  );
};

export default ConnectForm;
