# Attendance Backend

## Principe

Passerelle rest pour le plugins "présence" de Odoo.


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

le token doit être transmis à chaque requête dans le header x-api-auth


### [GET] /users


### [GET] /users/:id


### [PUT] /users/:id
