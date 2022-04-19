const db = require("../models");
const { Op } = require("sequelize");
var moment = require("moment");

function getUserInformation(req, res) {
    const id = req.userId;
    const startDate = moment().utc().startOf("day").format("YYYY/MM/DD HH:mm:ss");
    const endDate = moment().utc().endOf("day").format("YYYY/MM/DD HH:mm:ss");
    db.User.findByPk(id, {
        attributes: ["id", "name", "email", "mobile", "avatar", "description"],
        include: [
            {
                model: db.Room,
                as: "rooms",
                attributes: ["id", "name", "cover_image", "description"],
            },
            {
                model: db.User,
                as: "friends",
                attributes: ["id", "name", "email", "mobile"],
            },
            {
                model: db.User,
                as: "friendsTWo",
                attributes: ["id", "name", "email", "mobile"],
            },
            {
                model: db.User,
                as: "friendRequests",
                attributes: ["id", "name", "email", "mobile"],
            },
            {
                model: db.User,
                as: "mySentFriendRequests",
                attributes: ["id", "name", "email", "mobile"],
            },
            {
                model: db.Wink,
                as: "TodayWinks",
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate],
                    },
                },
                required: false,
            },
            {
                model: db.Wink,
                as: "hasWinks",
            },
        ],
        order: [[{ model: db.Room, as: "rooms" }, "createdAt", "DESC"]],
    })
        .then((user) => {
            const theRoom = [];
            const theFriends = [];
            const theFriendsRequests = [];
            const mySentFriendsRequests = [];
            const countFriendsRequests = user.friendRequests.length;
            const todayWinksCount = user.TodayWinks.length;
            const winkCount = user.hasWinks.length;
            const theUser = {
                id: user.id,
                name: user.name,
                winks: { winkCount, todayWinksCount },
                email: user.email,
                mobile: user.mobile,
                avatar: ``,
                description: user.description,
            };
            if (user.rooms) {
                user.rooms.forEach((el) => {
                    theRoom.push({
                        id: el.id,
                        name: el.name,
                        cover_image: el.cover_image,
                        description: el.description,
                    });
                });
            }
            if (user.friends) {
                user.friends.forEach((el) => {
                    theFriends.push({
                        id: el.id,
                        name: el.name,
                        email: el.email,
                        mobile: el.mobile,
                    });
                });
            }
            if (user.friendsTWo) {
                user.friendsTWo.forEach((el) => {
                    theFriends.push({
                        id: el.id,
                        name: el.name,
                        email: el.email,
                        mobile: el.mobile,
                    });
                });
            }
            if (user.friendRequests) {
                user.friendRequests.forEach((el) => {
                    theFriendsRequests.push({
                        id: el.id,
                        name: el.name,
                        email: el.email,
                        mobile: el.mobile,
                    });
                });
            }
            if (user.mySentFriendRequests) {
                user.mySentFriendRequests.forEach((el) => {
                    mySentFriendsRequests.push({
                        id: el.id,
                        name: el.name,
                        email: el.email,
                        mobile: el.mobile,
                    });
                });
            }

            res.status(201).json({
                message: "success get the user information",
                data: {
                    user: theUser,
                    rooms: theRoom,
                    friends: theFriends,
                    friend_requests: theFriendsRequests,
                    friend_requests_count: countFriendsRequests,
                    my_sent_friend_requests: mySentFriendsRequests,
                },
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "you are not authorized",
                error: error,
            });
        });
}

function getUserProfile(req, res) {
    const userId = req.userId;
    const friendId = req.params.id;
    const startDate = moment().utc().startOf("day").format("YYYY/MM/DD HH:mm:ss");
    const endDate = moment().utc().endOf("day").format("YYYY/MM/DD HH:mm:ss");

    db.User.findByPk(friendId, {
        include: {
            model: db.Wink,
            as: "hasWinks",
        },
    })
        .then((response) => {
            db.Wink.findAll({
                where: {
                    [Op.and]: [
                        { FromUserId: userId },
                        { ToUserId: friendId },
                        {
                            createdAt: {
                                [Op.between]: [startDate, endDate],
                            },
                        },
                    ],
                },
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
                            profile: user,
                            winksCount: winkscount,
                            hadWink: hadWink,
                        });
                    }
                    res.status(500).json({
                        message: "no such user found",
                    });
                })
                .catch((e) => {
                    res.status(401).json({
                        message: "error cant get winks",
                    });
                });
        })
        .catch(() => {
            res.status(400).json({
                message: "error",
            });
        });
}

function setWink(req, res) {
    const userId = req.userId;
    const ToWinkId = req.params.id;
    db.Wink.create({
        ToUserId: ToWinkId,
        FromUserId: userId,
    })
        .then(() => {
            res.status(201).json({
                message: "success winking",
            });
        })
        .catch(() => {
            res.status(401).json({
                message: "error can't winking",
            });
        });
}

module.exports = {
    getUserInformation,
    getUserProfile,
    setWink,
};
