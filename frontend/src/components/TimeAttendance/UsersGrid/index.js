import {compose} from 'redux'
import Component from './component';
import Container from './redux';

const enhance = compose(
  Container,
)


export default enhance(Component);
