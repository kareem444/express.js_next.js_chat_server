const db = require("../models");
const { Op } = require("sequelize");

function friendRequest(req, res) {
    userId = req.userId;
    requestId = req.params.id;
    db.Frinds.create({ UserOneId: requestId, UserTwoId: userId })
        .then(() => {
            db.User.findOne({
                where: {
                    id: requestId,
                },
                attributes: ["id", "name", "email", "mobile"],
            })
                .then((newFriend) => {
                    res.status(201).json({
                        message: "seuccess getting friend",
                        newFriend: newFriend,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "failing getting friend request",
                    });
                });
            db.FriendRequests.destroy({
                where: {
                    [Op.or]: [
                        { [Op.and]: [{ FromUserId: userId }, { ToUserId: requestId }] },
                        { [Op.and]: [{ ToUserId: userId }, { FromUserId: requestId }] },
                    ],
                },
            })
                .then(() => {
                    res.status(201).json({ message: "deleting compelet" });
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "failing deleting friend request",
                    });
                });
        })
        .catch((ree) => {
            res.status(400).json({
                message: "faild request",
            });
        });
}

function makeFriendRequest(req, res) {
    const userId = req.userId;
    const requestId = req.params.id;

    db.FriendRequests.create({
        ToUserId: requestId,
        FromUserId: userId,
    })
        .then(() => {
            db.User.findOne({
                where: {
                    id: requestId,
                },
                attributes: ["id", "name", "email", "mobile"],
            }).then((user) => {
                res.status(201).json({
                    message: "seccuss sending friend request",
                    sentRequestUser: user
                });
            }).catch(() => {
                res.status(401).sjson({
                    message: "error get send friend request",
                });
            })
        })
        .catch(() => {
            res.status(401).sjson({
                message: "error cant send friend request",
            });
        });
}


function deleteFriendRequest(req, res) {
    const userId = req.userId;
    const requestId = req.params.id;
    db.FriendRequests.destroy({
        where: {
            ToUserId: requestId,
            FromUserId: userId,
        }
    }).then(()=>{
        res.status(201).json({
            "message" : "success deleting friendRequest"
        })
    }).catch(()=>{
        res.status(401).json({
            "message" : "error can't deleting friendRequest"
        })
    })
}

function deleteFriend(req, res) {
    const userId = req.userId;
    const friendId = req.params.id;

    db.Frinds.destroy({
        where: {
            [Op.or]: [
                { [Op.and]: [{ UserOneId: userId }, { UserTwoId: friendId }] },
                { [Op.and]: [{ UserTwoId: userId }, { UserOneId: friendId }] },
            ],
        }
    }).then(() => {
        res.status(201).json({
            "message": "success deleting friend"
        })
    }).catch(() => {
        res.status(401).json({
            "message": "error"
        })
    })
}

module.exports = {
    friendRequest: friendRequest,
    makeFriendRequest: makeFriendRequest,
    deleteFriend,
    deleteFriendRequest
};
