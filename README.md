# MyWalletApi
Node express api for Alkemy fullstack challenge

### API rest for React client deployed at (https://my-wallet-client-chi.vercel.app/)

Routes:  

 /user :  
 POST /login - route for login the USER.  
 POST /register - route for registration of the USER.  
 GET /user - route for current USER session data.  
 GET /logout - route for deleting USER session.  
 
 /transactions :  
 GET / - route for fetching all transactions of the USER logged.  
 GET /last - route for fetching last transactions of the USER logged.  
 POST / - route for transaction creation.  
 GET /balance - get balance of USER.  
 PUT / - route for update a transaction.  
 DELETE /:transaction_id - delete USER transaction by id.  

### To run tests
npm run test  
Tests developed with Chai, Mocha and Supertest  

Chai - Mocha - Supertest - Nodejs - Express - Passport js

### `deployment`
https://mywallet-alkemy-api.herokuapp.com/
