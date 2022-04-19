const db = require("../models");

const User = db.User;

function checkIfExisitUser(req, res, next) {
    // check the email
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!",
            });
            return;
        }
    });

    // check the mobile
    User.findOne({
        where: {
            mobile: req.body.mobile,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({
                message: "Failed! Mobile is already in use!",
            });
            return;
        }
    });

    next();
}

module.exports = checkIfExisitUser;
