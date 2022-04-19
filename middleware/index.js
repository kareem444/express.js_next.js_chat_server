const verifySignin = require('./verifySignUp')
const checkauth = require('./auth')

module.exports = {
    isSignin: verifySignin,
    auth: checkauth
}