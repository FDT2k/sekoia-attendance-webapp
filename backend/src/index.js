const express = require('express');
const app = express();
const Router = express.Router();
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4')
const jwt_secret = uuid();
var bodyParser = require('body-parser')


let sessions = {}


let config ={
  host: process.env.ODOO_SERVER,
  port: process.env.ODOO_PORT || 8069,
  database: process.env.ODOO_DB || 'Sekoia4',
  username: process.env.ODOO_USER,
  password: process.env.ODOO_PW
}


const authenticateMW = (req,res,next)=>{
  const tok = req.headers['x-api-auth'];
  //console.log(tok)
  try {
    if(jwt.verify(tok,jwt_secret)){
      if(sessions[tok]){
        req.creds = sessions[tok]
        return next();
      }else{
        throw new Error('Session not found')
      }
    }
  }catch(err){
    res.status(401).send(err)
  }

  res.status(401).send('authorization failed')
}


Router.post('/authenticate',(req,res)=>{
  let token =jwt.sign({ foo: 'bar' }, jwt_secret);

  sessions[token] = req.body;


  res.send({token})
})



Router.get('/',authenticateMW,(req,res)=>{

  res.send(req.creds);
})




app.use(bodyParser.json())

app.use(Router)

app.listen(process.env.LISTEN_PORT || 3000);
