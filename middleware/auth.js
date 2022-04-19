const jwt = require("jsonwebtoken");

require('dotenv').config()
const { SECRET_TOKEN } = process.env;

function auth(req, res, next) {
    console.log(req.headers);
    let token = req.headers.authorization.split(" ")[1]

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = auth