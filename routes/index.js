const router = require('./user')
const auth = require('./auth')
const room = require('./room')

module.exports = {
    user: router,
    auth: auth,
    room: room
}