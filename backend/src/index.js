const express = require('express');
const app = express();
const Router = express.Router();
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4')
const jwt_secret = uuid();
const bodyParser = require('body-parser')
const { validate } = require ('parameter-validator');
const _ = require('lodash')
const { ODOO } = require('./odoo')

let sessions = {}

const reply_error = (res,error,http=500) =>{
    res.status(http).send({success:false,error:error.message,error_code:error.code})
}

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
        console.log(ODOO(sessions[tok]))
        req.odoo = ODOO(sessions[tok])
        return next();
      }else{
        throw new Error('Session not found')
      }
    }
  }catch(err){
    reply_error(res,err,401)

  }
}


const normalize_employee = employee => _.pick(employee,['name','id','image_small'])


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
  .then(result => {
    res.send(result)
  })
  .catch(error=>{
    console.error(error)
    reply_error(res,error)
  })
})

Router.post('/users/:id',authenticateMW,(req,res)=>{
  ODOO(req.creds).then(client=>{


  }).then(result => {
    res.send(result)
  }).catch(error=>{
    console.error(error)
    reply_error(res,error)
  })

})


app.use(bodyParser.json())

app.use(Router)

app.listen(process.env.LISTEN_PORT || 3000);
