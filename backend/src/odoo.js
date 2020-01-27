const Odoo = require('@gky/odoo-api');
const moment = require('moment')

const _odoo_date_fmt = 'YYYY-MM-DD HH:mm:ss'


const MODEL_EMPLOYEE = 'hr.employee';
const MODEL_ATTENDANCE = 'hr.attendance';

// bind args into an array  List -> [List]
const make_jsonrpc_args = (...args) => [...args]


const get_users = odoo => _ => odoo.then(client => client.searchRead(MODEL_EMPLOYEE,[]));
const get_user = odoo => id => odoo.then(client => client.read(MODEL_EMPLOYEE,make_jsonrpc_args(parseInt(id))));

const get_presences = odoo => employee_id => odoo.then(
  client=>client.searchRead(
    MODEL_ATTENDANCE,
    make_jsonrpc_args([['employee_id', '=', parseInt(employee_id)]])
  )
)


const create_attendance = odoo => (employee_id,check_in,) => odoo.then(
  client=>client.create(
    MODEL_ATTENDANCE,
    make_jsonrpc_args({check_in:moment().format(_odoo_date_fmt),check_out:false,employee_id})
  )
)


const update_attendance = odoo => (attendance_record_id) => odoo.then(
  client=>client.call(
    MODEL_ATTENDANCE,
    'write',
    make_jsonrpc_args(
      [parseInt(attendance_record_id)],
      {check_out:moment().format(_odoo_date_fmt)}
    )
  )
)


// @returns Promise -> OdooAPIClient
const ODOO = (opts)=>{
  console.log('initialize odoo connection with',opts)
  const {host,port,database,username,password} = opts
  const odoo =  new Odoo({host,port}).connect({database,username,password});

  return {
    get_users: get_users(odoo),
    get_user: get_user(odoo),
    get_presences: get_presences(odoo),
    create_attendance: create_attendance(odoo),
    update_attendance: update_attendance(odoo),
  }
}
module.exports = {ODOO} ;
