const Odoo = require('@gky/odoo-api');
const moment = require('moment')
const {APIError} = require('./error')

const _odoo_date_fmt = 'YYYY-MM-DD HH:mm:ss'


const MODEL_EMPLOYEE = 'hr.employee';
const MODEL_ATTENDANCE = 'hr.attendance';

// bind args into an array  List -> [List]
const make_jsonrpc_args = (...args) => [...args]


const get_users = odoo => _ => odoo.then(client => client.searchRead(MODEL_EMPLOYEE,[]));
const get_user = odoo => id => odoo.then(client => client.read(MODEL_EMPLOYEE,make_jsonrpc_args(parseInt(id))));

const get_attendances = odoo => employee_id => odoo.then(
  client=>client.searchRead(
    MODEL_ATTENDANCE,
    make_jsonrpc_args([['employee_id', '=', parseInt(employee_id)]])
  )
)


const create_attendance = odoo => (employee_id,check_in) => odoo.then(
  client=>client.create(
    MODEL_ATTENDANCE,
    make_jsonrpc_args({check_in:moment().format(_odoo_date_fmt),check_out:false,employee_id})
  )
)


//  update the ckeck_out from an attendance record id

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

const check_in = odoo=> (user_id,pin)=>{
  return get_user(odoo)(user_id)
  .then (user => {
    if(user.length!=1)
      throw new APIError('unkown user id',401);

    if (user[0].pin != pin)
      throw new APIError('Code pin invalide',401)

    if (user[0].attendance_state == 'checked_in')
      throw new APIError('User is already checked out',666)

    return create_attendance(odoo)(user_id)
  }).then(response=> {
    return {
      action:'checked_in',
      user_id
    }
  }

  )
}


const check_out = odoo => (user_id,pin)=>{
  return get_user(odoo)(user_id)
  .then (user => {
    if(user.length!=1)
      throw new APIError('unkown user id',404);
    if (user[0].pin != pin)
      throw new APIError('invalid pin',401)

    if (user[0].attendance_state == 'checked_out')
      throw new APIError('User is already checked out',666)

    return get_attendances(odoo)(user_id)
  })
  .then(reply=>{

    const {id} = reply[0];
    return update_attendance(odoo)(id)
  }).then(response=>{
    return {
      action:'checked_out',
      user_id
    }
  });
}

const toggle_check_status = odoo => (user_id,pin)=>{
  return get_user(odoo)(user_id)
  .then (user => {
    if(user[0].attendance_state == 'checked_out'){
      return check_in(odoo)(user_id,pin);
    }else{
      return check_out(odoo)(user_id,pin);
    }
  });
}

// @returns Promise -> OdooAPIClient
const ODOO = (opts)=>{
  console.log('initialize odoo connection with',opts)
  const {host,port,database,username,password} = opts
  const odoo =  new Odoo({host,port}).connect({database,username,password});

  return {
    get_users: get_users(odoo),
    get_user: get_user(odoo),
    get_attendances: get_attendances(odoo),
    create_attendance: create_attendance(odoo),
    update_attendance: update_attendance(odoo),
    check_in: check_in(odoo),
    check_out: check_out(odoo),
    toggle_check_status: toggle_check_status(odoo)
  }
}
module.exports = {ODOO} ;
