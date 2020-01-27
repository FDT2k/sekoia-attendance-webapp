const express = require('express');
const app = express();
const Router = express.Router();
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4')
const jwt_secret = uuid();
const bodyParser = require('body-parser')
const { validate } = require ('parameter-validator');
const _ = require('lodash')
const {serializeError, deserializeError} = require('serialize-error');
const { ODOO } = require('./odoo')

let sessions = {}

class APIError extends Error {

   constructor(message) {
       super(message);
       this.name = this.constructor.name;
       this.message = message;
   }
}

const format_error = error => {
  const _err = serializeError(error)
  return {success:false,error:_.omit(_err,['data.debug','stack'])}
}

const reply_error = (res,error,http=500) =>{
    res.status(http).send(format_error(error))
}
const reply = (res)=> (response) => res.send(response)

const handle_express_error = error =>{
  console.error(error)
  reply_error(res,error)
}

const authenticateMW = (req,res,next)=>{
  //récupérer le token
  const tok = req.headers['x-api-auth'];
  try {
    if(jwt.verify(tok,jwt_secret)){
      if(sessions[tok]){
        // on initialize la factory avec le contenu de la session
        req.odoo = ODOO(sessions[tok])
        return next();
      }else{
        throw new APIError('Session not found')
      }
    }
  }catch(err){
    reply_error(res,err,401)

  }
}


const normalize_employee = employee => _.pick(employee,['name','id','image_small','attendance_ids','attendance_state'])
const get_pin = employee =>  employee['pin']


Router.post('/authenticate',(req,res)=>{
  let token =jwt.sign({ foo: 'bar' }, jwt_secret);
  try {
    const {host,port,database,user,password } = validate(req.body,['host','port','database','username','password'])
    sessions[token] = req.body;
    res.send({token})
  }catch(error){
    reply_error(res,error)
  }
})



Router.get('/users',authenticateMW,(req,res)=>{
  req.odoo.get_users()
  .then(result => {
    res.send(result.map(normalize_employee))
  })
  .catch(handle_express_error)
})

Router.get('/users/:id',authenticateMW,(req,res)=>{
  req.odoo.get_presences(req.params.id)
  .then(reply(res))
  .catch(error=>{
    console.error(error)
    reply_error(res,error)
  })
})


// check_in
Router.post('/users/:id/',authenticateMW,(req,res)=>{
  const {odoo} = req;
  const {id} = req.params;
  const {pin} = req.body;
  odoo.get_user(id)
  .then (_user_ => {
    if(_user_.length!=1)
      throw new APIError('unkown user id');
    if (_user_[0].pin != pin)
      throw new APIError('invalid pin')

    return odoo.create_attendance(id)
  })
  .then(
    result => {

      reply({success:true,id:result})

    }
  ).catch(error=>{
    console.error('huho',error)
    reply_error(res,error)
  })
})


// update an attendance
Router.put('/users/:attendance_id',authenticateMW,(req,res)=>{
  const {odoo} = req;
  const {attendance_id} = req.params;
  odoo.update_attendance(attendance_id).then(
    reply(res)

  ).catch(error=>{
    console.error(error)
    reply_error(res,error)
  })
})



app.use(bodyParser.json())

app.use(Router)

app.listen(process.env.LISTEN_PORT || 3000);
