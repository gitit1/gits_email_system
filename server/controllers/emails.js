
let data = require('../data');

const getUserData = (userEmail) =>{
  return data.allEmailsList.find(userData => userData.userEmail === userEmail);
}

exports.get = (req, res) => {
    res.send(getUserData(req.params.userEmail).emails_list)
};

exports.new = (req, res) => {
    const newData = [];
    data.allEmailsList.map(function (a) {
      if ((a.userEmail == req.params.userEmail) || (a.userEmail == req.body.reciever)) {
        a.emails_list = [...a.emails_list, {
          id: Number(req.body.creation_date),
          avatar_color: a.avatar_color,
           ...req.body,
          }];
      }
      newData.push(a);
    });
    data.allEmailsList = newData;
    
    const userData = getUserData(req.params.userEmail);  
    res.send(userData.emails_list)
};

exports.delete = (req, res) => {
    const newData = [];
    const userData = getUserData(req.params.userEmail);
    const newUserEmailList = userData.emails_list.filter(i => i.id !== Number(req.params.emailId));

    data.allEmailsList.map(function (a) {
      if (a.userEmail == req.params.userEmail) {
        a.emails_list = newUserEmailList;
      }
      newData.push(a);
    });
    data.allEmailsList = newData;

    res.send(newUserEmailList);
};

