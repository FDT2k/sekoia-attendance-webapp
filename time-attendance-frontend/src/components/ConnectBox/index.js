
import Component from './component';
import Container from './container';
import connect from './connect';
import {compose} from 'redux'
const enhance = compose(
	connect,
  Container,
)


export default enhance(Component);
