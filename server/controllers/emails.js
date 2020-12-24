
let data = require('../data');
let dataArray = data.allEmailsList;

const getUserData = (userEmail) =>{
  return dataArray.find(userData => userData.userEmail === userEmail);
}

exports.get = (req, res) => {
    const userData = getUserData(req.params.userEmail);
    res.send(userData.emailsList)
};

exports.new = (req, res) => {
    const newData = [];
    dataArray.map(function (a) {
      if ((a.userEmail == req.params.userEmail) || (a.userEmail == req.body.reciever)) {
        a.emailsList = [...a.emailsList, {id: Number(req.body.creation_date), ...req.body}];
      }
      newData.push(a);
    });
    dataArray = newData;
    
    const userData = getUserData(req.params.userEmail);  
    res.send(userData.emailsList)
};

exports.delete = (req, res) => {
    const newData = [];
    const userData = getUserData(req.params.userEmail);
    const newUserEmailList = userData.emailsList.filter(i => i.id !== Number(req.params.emailId));

    dataArray.map(function (a) {
      if (a.userEmail == req.params.userEmail) {
        a.emailsList = newUserEmailList;
      }
      newData.push(a);
    });
    dataArray = newData;

    res.send(newUserEmailList);
};

