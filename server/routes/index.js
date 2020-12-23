const express = require('express');
const router = express.Router();
const data = require('../data.js');
try {
  router.get('/users/:userEmail/emails', (req, res) => {
    console.log('get emails of user: ', req.params.userEmail);
    const userData = data.allEmailsList.find(userData => userData.userEmail === req.params.userEmail);
    res.send(userData.emailsList)
  });

  router.delete('/users/:userEmail/emails/:emailId', (req, res) => {
    const newData = [];
    let userData = data.allEmailsList.find(userData => userData.userEmail === req.params.userEmail);
    const newUserEmailList = userData.emailsList.filter(i => i.id !== Number(req.params.emailId));
    // Dealing with fake "DB":
    data.allEmailsList.map(function (a) {
      if (a.userEmail == req.params.userEmail) {
        a.emailsList = newUserEmailList;
      }
      newData.push(a);
    });
    data.allEmailsList = newData;

    res.send(newUserEmailList);
  });

  router.get('/users/:userEmail', (req, res) => {
    console.log('get user')
    const isUserExsist = data.allEmailsList.some(
      obj => obj.userEmail === req.params.userEmail
    );
    res.send(isUserExsist);
  });

} catch (e) {
  console.log(`ERROR!! \n${e.stack}`);
}

module.exports = router;
