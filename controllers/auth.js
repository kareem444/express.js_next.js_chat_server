var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const db = require("../models");
const { signupValidation, signinValidation } = require("../validation/user");

require("dotenv").config();
const { SECRET_TOKEN } = process.env;

async function signup(req, res) {
    const user = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
    };
    await signupValidation
        .validateAsync(user)
        .then((response) => {
            bcrypt.hash(response.password, 10, function (err, hash) {
                db.User.create({
                    name: response.name,
                    email: response.email,
                    mobile: response.mobile,
                    password: hash,
                })
                    .then((user) => {
                        const token = jwt.sign({ id: user.id }, SECRET_TOKEN, {
                            expiresIn: 86400, // 24 hours
                        });
                        res.status(201).json({
                            message: "successed signup",
                            token: token,
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({ message: err.message });
                    });
            });
        })
        .catch((e) => {
            res.status(401).json(e.message);
        });
}

async function login(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    await signinValidation
        .validateAsync(user)
        .then((response ) => {
            db.User.findOne({
                where: {
                    email: user.email
                },
            })
                .then((user) => {
                    bcrypt.compare(
                        response.password,
                        user.password,
                        function (err, result) {
                            if (result) {
                                const token = jwt.sign({ id: user.id }, SECRET_TOKEN,
                                //      {
                                //     expiresIn: 86400, // 24 hours
                                // }
                                );
                                res.status(201).json({
                                    message: "successed login",
                                    token: token,
                                });
                            } else {
                                res.status(500).json({
                                    message: "password error",
                                });
                            }
                        }
                    );
                })
                .catch(() => {
                    res.status(500).json({
                        message: "no such user exist",
                    });
                });
        })
        .catch((error) => {
            res.json({ message: error });
        });
}

module.exports = {
    signup,
    login,
};
