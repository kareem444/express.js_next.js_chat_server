const db = require("../models");
const { Op } = require("sequelize");

function getUserRoom(req, res) {
    db.User.findByPk(1, {
        attributes: ["id", "name", "email", "mobile"],
        include: [
            {
                model: db.Room,
                as: "rooms",
                attributes: ["id", "name", "cover_image"],
            },
        ],
    }).then((e) => {
        const theRooms = [];
        const rooms = e.rooms;
        rooms.forEach((el) => {
            theRooms.push({
                id: el.id,
                name: el.name,
                cover_image: el.cover_image,
            });
        });
        res.status(201).json({
            message: "seccess getting the user andd his rooms",
            data: {
                user: {
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    mobile: e.mobile,
                },
                rooms: theRooms,
            },
        });
    });
}

function getRoom(req, res) {
    db.Room.findByPk(req.params.id, {
        attributes: [
            "id",
            "name",
            "description",
            "cover_image",
            "background_image",
            "admin_one",
            "admin_two",
            "admin_three",
        ],
        include: {
            model: db.Message,
            as: "messages",
            attributes: ["id", "content"],
            include: {
                model: db.User,
                as: "user",
                attributes: ["id", "name", "avatar"],
            },
        },
    })
        .then((response) => {
            res.json(response);
            if (response) {
                res
                    .status(201)
                    .json({ message: "success get the room", data: response });
            } else {
                res.status(500).json({ message: "can't get the room" });
            }
        })
        .catch(() => {
            res.status(400).json({
                message: "error cant get the room",
            });
        });
}

function createRoom(req, res) {
    const userId = req.userId;
    const friendId = req.params.id;

    db.Room.create()
        .then((room) => {
            if (room) {
                db.UserRooms.create({
                    UserId: userId,
                    RoomId: room.id,
                });
                db.UserRooms.create({
                    UserId: friendId,
                    RoomId: room.id,
                });
                res.status(201).json({
                    message: "success creating room",
                });
            }
        })
        .catch(() => {
            res.status(401).json({
                message: "error cant create room",
            });
        });
}

function create(req, res) {
    const message = req.body.data.message;
    const userId = req.userId;
    const roomId = req.params.id;

    db.Message.create({
        content: message,
        user_id: userId,
        room_id: roomId,
    })
        .then((response) => {
            res.status(201).json({
                message: "success create mesage",
            });
        })
        .catch(() => {
            res.status(400).json({
                message: "can't create the message",
            });
        });
}

function leaveRoom(req, res) {
    const userId = req.userId;
    const roomId = req.params.id;

    db.UserRooms.destroy({
        where: {
            [Op.and]: [{ UserId: userId }, { RoomId: roomId }],
        },
    })
        .then((ee) => {
            console.log(ee);
            res.status(201).json({
                message: "success leaving the room",
            });
        })
        .catch((rr) => {
            console.log(rr);
            res
                .status(400)
                .json({ messaage: "can't leave the room some thing went wrong" });
        });
}

function invokeFriend(req, res) {
    const friendId = req.headers.friendid;
    const roomId = req.params.id;

    db.UserRooms.findOne({
        where: {
            UserId: friendId,
            RoomId: roomId,
        },
    })
        .then((response) => {
            if (!response) {
                db.UserRooms.create({
                    UserId: friendId,
                    RoomId: roomId,
                }).then(() => {
                    res.status(201).json({
                        message: "success invoking friend",
                    });
                });
            } else {
                res.status(201).json({
                    message: "friend is already invoked ",
                });
            }
        })
        .catch(() => {
            res.status(401).json({
                message: "error invoking friend",
            });
        });
}

module.exports = {
    getUserRoom: getUserRoom,
    getRoom: getRoom,
    create: create,
    leaveRoom: leaveRoom,
    createRoom: createRoom,
    invokeFriend: invokeFriend,
};
