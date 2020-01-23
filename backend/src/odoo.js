const Odoo = require('odoo-api');
const moment = require('moment')

const _odoo_date_fmt = 'YYYY-MM-DD HH:'

const get_users = odoo => _ => odoo.then(client => client.searchRead('hr.employee',[]));

const get_presences = odoo => employee_id => odoo.then(client=>client.searchRead('hr.attendance',[['employee_id', '=', parseInt(employee_id)]]))
const create_attendance = odoo => (employee_id,check_in,) => odoo.then(client=>client.create('hr.attendance',[
  [{check_in:moment.format(_odoo_date_fmt)}]

]))



// @returns Promise -> OdooAPIClient
const ODOO = (opts)=>{
  console.log('initialize odoo connection with',opts)
  const {host,port,database,username,password} = opts
  const odoo =  new Odoo({host,port}).connect({database,username,password});

  return {
    get_users: get_users(odoo),
    get_presences: get_presences(odoo)
  }
}
module.exports = {ODOO} ;
