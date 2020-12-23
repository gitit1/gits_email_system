const express = require('express');
const router = express.Router();
const data = require('../data.js');
try {
  router.get('/users/:userEmail/emails', (req, res) => {
    const userData = data.allEmailsList.find(userData => userData.userEmail === req.params.userEmail);
    res.send(userData.emailsList)
  });

  router.post('/users/:userEmail/emails', (req, res) => {
    const newData = [];
    data.allEmailsList.map(function (a) {
      if ((a.userEmail == req.params.userEmail) || (a.userEmail == req.body.reciever)) {
        a.emailsList = [...a.emailsList, {id: Number(req.body.creation_date), ...req.body}];
      }
      newData.push(a);
    });
    data.allEmailsList = newData;
    
    let userData = data.allEmailsList.find(userData => userData.userEmail === req.params.userEmail);    
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
    const isUserExsist = data.allEmailsList.some(
      obj => obj.userEmail === req.params.userEmail
    );
    res.send(isUserExsist);
  });

} catch (e) {
  console.log(`ERROR!! \n${e.stack}`);
}

module.exports = router;
