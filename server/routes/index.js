const express = require('express');
const router = express.Router();

const users = require('../controllers/users.js');
const emails = require('../controllers/emails.js');

try {
  router.post('/users/:userEmail',users.login);
  router.post('/users/:userEmail/new',users.register);
  
  router.get('/users/:userEmail/emails',emails.get);
  router.post('/users/:userEmail/emails',emails.new);
  router.delete('/users/:userEmail/emails/:emailId',emails.delete);


} catch (e) {
  console.log(`ERROR!! \n${e.stack}`);
}

module.exports = router;
