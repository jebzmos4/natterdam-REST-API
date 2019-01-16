Natterbase User Service API
==============================================

The Natterbase User Service API has Endpoints that authenticates a user with JWT and perfoems CRD on a countries array

Create a `.env` file
----------------------------
Add the parameters below (`add your own values`)

**Environment Variables:**
```
KEY=
```

Get API running
----------------------------
```
npm install --save

npm run start
```

## Routes

NAME     					| END POINT     |  PARAMS
--------------------------- | ------------- | ----------
Base     					| /             |
Authenticate User    	    | /login        |`username`&`password` e.g {username: 'xyz', password: '123'}
get all countries           | /countries    | 
add a country     POST      | /countries    | `country` e.g {country: nigeria}
delete a country  DELETE    | /countries    | `country` e.g {country: nigeria}