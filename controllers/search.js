const db = require('../models')
const { Op } = require("sequelize");
var moment = require("moment");

function searchForUser(req, res) {
    const userId = req.userId;
    db.User.findOne({
        where: {
            [Op.or]: [{ email: req.body.search }, { mobile: req.body.search }]
        },
        include: {
            model: db.Wink,
            as: "hasWinks",
        },
    }).then(response => {
        const startDate = moment().utc().startOf("day").format("YYYY/MM/DD HH:mm:ss");
        const endDate = moment().utc().endOf("day").format("YYYY/MM/DD HH:mm:ss");
        db.Wink.findAll({
            where: {
                [Op.and]: [
                    { FromUserId: userId },
                    { ToUserId: response.id },
                    {
                        createdAt: {
                            [Op.between]: [startDate, endDate],
                        }
                    }
                ]
            }
        })
        .then((winked) => {
                const hadWink = winked.length;
                const user = [
                    {
                        id: response.id,
                        name: response.name,
                        avatar: response.avatar,
                        description: response.description,
                        email: response.email,
                        mobile: response.mobile,
                    },
                ];
                const winkscount = response.hasWinks.length;
                if (response) {
                    res.status(201).json({
                        message: "success get profile",
                        profile: user[0],
                        winksCount: winkscount,
                        hadWink: hadWink
                    });
                }
                res.status(500).json({
                    message: "no such user found",
                });
            }).catch(e => {
                res.status(401).json({
                    "message": "error cant get winks"
                });
            })
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = searchForUser