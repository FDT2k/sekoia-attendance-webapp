import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

const __DATE_FORMAT = 'dd DD MMM HH:mm'
const makeFormat = _f => what => moment(what).format(_f)
const format = makeFormat(__DATE_FORMAT)


export default props => {
  return format(props.value);
}
