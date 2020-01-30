import {compose} from 'redux'

import Component  from '../../presence/PinPad'

import Container from './container';
import connect from './connect';

const enhance = compose(
	connect,
  Container,
)



export default enhance(Component);
