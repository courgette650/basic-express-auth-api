# Basic authentication REST API

Basic authentication API using JWT

# Summary 

- [Start project](#init)
- [Starting development](#dev)
- [Starting production](#prod)
- [List of queries](#queries)

## Start project <a id="init"/>

Start by installing every node modules

```sh
$ npm i
# Or
$ npm install
```

then init dotenv file

```sh
$ npm run init
# you can specify port by adding parameter
# ex : npm run init 4001
```

it should create a .env :
```sh
TOKEN_KEY=SECRET_KEY_VARIABLE
PORT=4001   # Default value
```

## Starting developpment <a id="dev"/>

```sh
$ npm run dev
```
 
## Starting for production <a id="prod"/>

```sh
$ npm start
```

## List of queries <a id="queries"/>

- Register
```sh
API_PATH/register
# Body
# IN -> email : the email for the user
# IN -> password : lengt between 7 and 40
```
- Login
```sh
API_PATH/login
# Body
# IN -> email 
# IN -> password
# Returns the user attributes with a token which expires in 2h by default
```
- Logout
```sh
API_PATH/logout
# Header
# IN -> x-access-token : the jwt token
```
- Welcome
```sh
API_PATH/welcome
# Header
# IN -> x-access-token : the jwt token
```