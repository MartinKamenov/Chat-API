# Chat-API
RestFul-API which supports web-scokets for live connections between client and server

## 1. Models
### User 
- user (Using users for login and registration),
- messenger (Specific separated chat for logged users)

## 2. Routes
### Messenger [/messenger]
#### Get chat messages [/messenger/:id]
1. [GET] request type

2. Description: Getting messages for the specific messenger from database

3. Return type: Array

4. Param object:
- id(number: id of the messenger)

5. Example
- Request: (GET)[URL][/messenger/1]
- Responce: 
["Hello","Sup","Ola","Hello" ...]

### Authentication [/auth]
#### Login/Register
1. [POST] request type

2. Description: Used for authentication after which users can send messages

3. Return type: String (representing the success state of authentication)

4. Query object:
- username(string: username for login user)
- password(string: crypted password of the user)
- email(string: email of authenticating user used in registration routh)

5. Example
- Request: (GET)[URL][/auth/login?username=martin&password=kamenov]
- Response: "Successfull login"

### WebSocket connection [ws:[URL]/messenger/:id]
1. [WS connection] request type

2. Description: Add user to messenger if there is logged one

3. Return type: String(message as string if new message is recieved)

4. Query object:
- message(string: message which would be send to api)
