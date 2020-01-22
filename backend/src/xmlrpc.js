let Odoo = require('odoo-api');


const connect = (host,port,db,user,pw)=>{
  return new Odoo({host,port}).connect();
}


const factory = (host,port,db,user,pw)=> {

  let config ={
    host: process.env.ODOO_SERVER,
    port: process.env.ODOO_PORT || 8069,
    database: process.env.ODOO_DB || 'Sekoia4',
    username: process.env.ODOO_USER,
    password: process.env.ODOO_PW
  }

  let odoo = connect(host,port,db,user,pw)




}



let odoo = new Odoo({host:config.host,port:config.port});

odoo.connect({
  database:config.database,username:config.username,password:config.password
}).then((client)=>{
  //console.log('coucou')

  return client.searchRead('hr.employee',[])
}).then(res=>{
  console.log('result',res.length)
}).catch(err=>{
  console.error(err)
});

console.log('starting')



module.exports = factory ;
