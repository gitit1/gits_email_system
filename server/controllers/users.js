
let data = require('../data');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getRandomColor } = require('../shared/randomColor');

const getUserData = (userEmail) => {
    return data.allEmailsList.find(userData => userData.userEmail === userEmail);
}

exports.register = async (req, res) => {
    const userData = getUserData(req.body.email);
    if (userData) {
        return res.status(400).json({ error: "Email already exists" });
    } else {
        const avatar_color = await getRandomColor();
        const newUser = {
            userEmail: req.body.email,
            password: req.body.password,
            avatar_color: avatar_color,
            emails_list: []
        };
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                data.allEmailsList = [...data.allEmailsList, newUser];
                res.json({ userEmail: newUser.userEmail });
            });
        });
    }
};

exports.login = async (req, res) => {
    const userData = getUserData(req.body.email);

    if (!userData) {
        return res.status(404).json({ error: "Email not found" });
    }

    bcrypt.compare(req.body.password, userData.password).then(isMatch => {
        if (isMatch) {
            const payload = {
                userEmail: req.body.email
            };
            jwt.sign(
                payload,
                "secret",
                {
                    expiresIn: 31556926
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        } else {
            return res.status(400).json({ error: "Password incorrect" });
        }
    });
}
