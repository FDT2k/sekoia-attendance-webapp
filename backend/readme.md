# Attendance Backend

## Principe

Passerelle rest pour le plugins "présence" de Odoo.


## Résumé

### prérequis
  Nodejs >= 10.x

### dépendances

  https://github.com/FDT2k/odoo-api


### install

    git clone https://github.com/FDT2k/sekoia-attendance-webapp

    cd sekoia-attendance-webapp/backend

    npm install

    npm start


## API


### [POST] /authenticate
#### request


      {
    	  host: "192.168.x.x", // string , odoo host
    	  port: 8069, // server port (http endpoint)
    	  database: "TestDB", //String: the database to use. Case sensitive
    	  username: "blabla", //the username to use (must have access to the plugin
		    password: "blabla"
      }

#### response


    {token:"<YOURTOKEN>"}

le token doit être transmis à chaque requête dans le header **x-api-auth** (sauf pour authenticate )


### [GET] /users
 récupère la liste des utilisateurs

### [GET] /attendance/:user_id
Recupère la liste des présences pour un user

### [POST] /toggle/:user_id

Bascule la présence d'un utilisateur

#### request
    {
      "pin":"xxxx"
    }

#### response

    {
      "success": true || false
    }

### [POST] /attendance/:user_id/check_in

#### response

    {
      "success": true || false
    }

#### request
    {
      "pin":"xxxx"
    }

### [POST] /attendance/:user_id/check_out

#### request
    {
      "pin":"xxxx"
    }

#### response
    {
      "success": true || false
    }
