const db = require('../models')
const { Op } = require("sequelize");

function checkAllowMessage(req, res, next) {
    const userId = req.userId;
    const roomMessageId = req.params.id;

    db.UserRooms.findOne({
        where: {
            [Op.and]: [{ UserId: userId }, { RoomId: roomMessageId }],
        }
    }).then(response => {
        if (!response) {
            res.status(500).json({
                "message": "you are not avalid to this room"
            });
            return;
        }else {
            next();
        }
    })
}

module.exports = {
    CAM: checkAllowMessage
}