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

const {APIError} = require('./error')

let sessions = {}


const format_error = error => {
  const _err = serializeError(error)
  return {success:false,error:_.omit(_err,['data.debug','stack'])}
}

const reply_error = (res)=>(error,http=500) =>{
    res.status(http).send(format_error(error))
}

const reply = (res)=> (response) => res.send(response)

const handle_express_error = error =>{
  console.error(error)
  reply_error(res,error)
}


const bindReplyAndError = (req,res,next)=>{
  res.reply = reply(res)
  res.reply_error = reply_error(res);
  next();

}

const authenticateMW = (req,{reply_error},next)=>{
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
    reply_error(err,401)

  }
}



const normalize_employee = employee => _.pick(employee,['name','id','image_small','attendance_ids','attendance_state'])
const get_pin = employee =>  employee['pin']


Router.post('/authenticate',(req,{reply,reply_error})=>{
  let token =jwt.sign({ foo: 'bar' }, jwt_secret);
  try {
    const {host,port,database,user,password } = validate(req.body,['host','port','database','username','password'])
    sessions[token] = req.body;
    reply({token})
  }catch(error){
    reply_error(error)
  }
})



Router.get('/users',authenticateMW,(req,{reply,reply_error})=>{

  req.odoo.get_users()
  .then(result => {
    reply(result.map(normalize_employee))
  })
  .catch(reply_error)
})




// check_in
Router.post('/attendances/:user_id/check_in',authenticateMW,(req,{reply,reply_error})=>{
  const {odoo} = req;
  const {user_id} = req.params;
  const {pin} = req.body;
  odoo.check_in(user_id,pin)
  .then(result => reply({success:true,id:result}))
  .catch(reply_error)
})



// get attend
Router.get('/attendances/:user_id',authenticateMW,(req,{reply,reply_error})=>{
  const {user_id} = req.params;

  req.odoo.get_attendances(user_id)
  .then(reply)
  .catch(reply_error)

})
// toggle status
Router.post('/toggle/:user_id',authenticateMW,(req,{reply,reply_error})=>{
  const {odoo} = req;
  const {user_id} = req.params;
  const {pin} = req.body;

  odoo.toggle_check_status(user_id,pin)
  .then(result => reply({success:result}))
  .catch(reply_error)
})

// update an attendance
Router.post('/atttendances/:user_id/check_out',authenticateMW,(req,{reply,reply_error})=>{
  const {odoo} = req;
  const {user_id} = req.params;
  const {pin} = req.body;

  odoo.check_out(user_id,pin)
  .then(result => reply({success:result}))
  .catch(reply_error)
})


app.use(bodyParser.json())
app.use(bindReplyAndError);

app.use(Router)

app.listen(process.env.LISTEN_PORT || 3000);
