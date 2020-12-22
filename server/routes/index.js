const express = require('express');
const router = express.Router();
const data = require('../data.js');

try {
  router.get('/emails/:userEmail', (req, res) => {
    console.log('/emails/:userEmail', req.params.userEmail);
    const userData = data.allEmailsList.find(userData => userData.userEmail === req.params.userEmail);
    res.send(userData.emailsList)
  });

  router.get('/users/:userEmail', (req, res) => {
    console.log('/users/:userEmail')
    const isUserExsist = data.allEmailsList.some(
      obj => obj.userEmail === req.params.userEmail
    );
    res.send(isUserExsist);
  });
} catch (e) {
  console.log(`ERROR!! \n${e.stack}`);
}

module.exports = router;
