let Odoo = require('odoo-api');

let config ={
  host: process.env.ODOO_SERVER,
  port: process.env.ODOO_PORT || 8069,
  database: process.env.ODOO_DB || 'Sekoia4',
  username: process.env.ODOO_USER,
  password: process.env.ODOO_PW
}


let odoo = new Odoo({host:config.host,port:config.port});

odoo.connect({
  database:config.database,username:config.username,password:config.password
}).then((client)=>{
  console.log('coucou')

  return client.searchRead('hr.employee',[])
}).then(res=>{
  console.log('result',res)
}).catch(err=>{
  console.error(err)
});

console.log('starting')
