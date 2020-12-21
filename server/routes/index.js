const express = require('express');
const router = express.Router();

try {
    router.get ('/', (req, res) => {res.send ('<h1>Home page</h1>'); });

    router.get ('/emails', (req, res) => {
        console.log('display a list of all emails');
        res.send([
            {
              sender: 'git@test.com',
              reciever: 'dan@test.com',
              message: 'hello!!!!',
              subject: 'this is test number 1',
              creation_date: 1603464807000,
            },
            {
              sender: 'lola@test.com',
              reciever: 'dan@test.com',
              message: 'hello 222!!!!',
              subject: 'this is test number 2',
              creation_date: 1603464807000,
            },
            {
              sender: 'luka@test.com',
              reciever: 'lexie@test.com',
              message: 'test!!!!!!!!!!',
              subject: 'this is test number 3',
              creation_date: 1603464807000,
            },
          ])
      });
  
} catch(e) {
  console.log(`ERROR!! \n${e.stack}`);
}

module.exports = router;