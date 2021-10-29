# Contacts API

## Overview
REST API used for working with a collection of contacts. It requires email verification after user registration.
### Commands to Run Node JS Application

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; server start in development mode
- `npm run lint` &mdash; run code check execution with eslint
- `npm lint:fix` &mdash; the same eslint check, but with automatic error-fixing
- `npm test` &mdash; run code tests 
- `npm run test:coverage` &mdash; test report generation based on code covered by tests

### Contact Routes

| Method | <http://localhost:{PORT}/api> | Description                       | Required parameters          |
| ------ | ----------------------------- | --------------------------------- | -----------------------------|
| GET    | /contacts                     | Retrieves info about all contacts | Authorization                |
| GET    | /contacts/{contactId}         | Finds a contact by ID             | Authorization, ID            |
| POST   | /contacts                     | Adds a new contact                | Authorization, body(JSON)    |
| PUT    | /contacts/{contactId}         | Updates an existing contact       | Authorization, ID, body(JSON)|
| PATCH  | /contacts/{contactId}/favorite| Updates a 'favorite' value        | Authorization, ID, body(JSON)|
| DELETE | /contacts/{contactId}         | Deletes a contact by ID           | Authorization, ID            |
| GET    | /contacts?page={1}&limit={20} | Paginates contacts                | Authorization, query params  |
| GET    | /contacts?favorite={true}     | Filters by a 'favorite' value     | Authorization, a query param |

### User Routes

| Method | <http://localhost:{PORT}/api> | Description                           | Required parameters           |
| ------ | ----------------------------- | ------------------------------------- | ------------------------------|
| POST   | /users/signup                 | Creates a new user                    | Body(JSON)                    |
| POST   | /users/login                  | Logs a user into the system           | Body(JSON)                    |
| POST   | /users/logout                 | Logs out current logged in user       | Authorization                 |
| GET    | /users/current                | Gets info about current user          | Authorization                 |
| PATCH  | /users/subscription           | Updates user subscription             | Authorization, body(JSON)     |
| GET    | /users/starter                | Gets access by 'starter' subscription | Authorization                 |
| GET    | /users/business               | Gets access by 'business' subscription| Authorization                 |
| GET    | /users/pro                    | Gets access by 'pro' subscription     | Authorization                 |
| PATCH  | /users/avatars                | Uploads user avatar                   | Authorization, body(form-data)|
| GET    | /users/verify/{verifyToken}   | Finds user by 'verifyToken' value     | A query param                 |
| POST   | /users/verify                 | Resends e-mail for user verification  | Body(JSON)                    |           

### Schemas
#### Contact Schema 
All items have some of the following properties, with required properties in bold:
Field     | Data type  | Description                                          |
--------- |------------|------------------------------------------------------|
**name**  | String     |A word or set of words by which a person is known.    |
**email** | String     |A unique identifier for an email account.             |
**phone** | String     |A number assigned for a specific phone.               |
favorite  | Boolean    |Defines preferred contacts (either true or false).    |
owner     | ObjectId   |Used as a unique identifier for a contact in database.|
**id**    | String     |The contact’s unique ID.                              |
 
_The sample of contact schema:_ :arrow_down:

```
{
  "name" : "Mathew Anderson",
  "email" : "mathew.anderson@gmail.com",
  "phone" : "(749) 123-4321",  
  "favorite" : true,
  "owner" : "61708e7945716321af0cf25e",
  "id" : "615ee809a3cb105c9db1ac16"
}
```
#### User Schema 
Users are identified by IDs, with required properties in bold.
Field          | Data type | Description                                                            |
-------------- |-----------|----------------------------------------------------------------------- |
**email**      | String    |A unique identifier for an email account.                               |
**password**   | String    |A string of characters that allows access to a service.                 | 
subscription   | String    |An access to a service defined by a certain user role.                  |
name           | String    |A word or set of words by which a person is known.                      |
token          | String    |Used to share security information between a client and a server.       |
avatarURL      | String    |A unique identifier that locates the avatar on the Internet.            | 
**id**         | String    |The contact’s unique ID.                                                |
idUserCloud    | String    |ID for added asset in Cloudinary account.                               | 
verify         | Boolean   |Indicates if user has passed verification or not (either true or false).|
**verifyToken**| String    |Token by which verification takes place.                                | 

_The sample of user schema:_ :arrow_down:

```
{
    "email": "mathew.anderson@gmail.com",
    "password": "12345678",
    "subscription": "pro" (enum: ["starter", "pro", "business"]),
    "name": "Mathew Anderson",
    "avatarURL": "https://s.gravatar.com/avatar/59029276955677351421b3ff6bf5ee4c?s=250",
    "token":  "xxxxx.yyyyy.zzzzz",       
    "id": "615ee809a3cb105c9db1ac16",
    "idUserCloud": "n8wzoryzzbyojdunoqmf",
    "verify": false, 
    "verifyToken": "xxxxx.yyyyy.zzzzz",             
}
```
