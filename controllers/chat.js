const { Chat } = require('../models/chat');
const { User } = require('../models/user');

class ChatController {
    static async getChatRoomByUserId(req, res, next) {
        try {
            const userId = req.userData._id
            const room = await Chat.find({user: userId})
            .populate({ path: "user", select: ["name", "image"] });

            res.status(200).json({
                success: true,
                message: "Success show all chat user",
                data: room,
            });

        } catch (err) {
            next(err)
        }
    }

    static async getConversationByRoomId(req, res, next) {
        try {
            const userSender = req.userData._id;
            const { roomId } = req.params;
            const room = await Chat.findById(roomId).populate({ path: "user", select: ["name", "image"] });
            res.status(200).json({
                success: true,
                data: {userSender, room}
            });
        } catch (err) {
            next(err)
        }
    }

    static async initiateChat(req, res, next) {
        try {
            const user1 = req.userData._id;
            const { user2 } = req.params;

            const availableRoom = await Chat.find({ user: [user1, user2] })
            .populate({ path: "user", select: ["name", "image"] });
            console.log(availableRoom);
            if(availableRoom.length > 0) {
                res.status(200).json({
                    isNew: false,
                    msg: 'Retrieving an old chatroom',
                    data: availableRoom
                })
            }

            else {
                let obj = {};

                obj.user = [user1, user2];

                const newRoom = await Chat.create(obj);
                await User.findByIdAndUpdate([user1, user2], { $push: { chats: newRoom } })
                res.status(200).json({
                    isNew: true,
                    msg: `${user1} create chatroom with ${user2}`,
                    data: newRoom
                })
            }    
        } catch (err) {
            next(err)
        }
    }

    static async postMessage(req, res, next) {
        try {
            let obj = {};
            const userSender = req.userData._id;
            const { roomId } = req.params;
            const { message } = req.body;

            obj.sender = userSender;
            obj.message = message;

            const room = await Chat.findByIdAndUpdate(roomId, { $push: { message: obj } }, { new: true })
                // global.io.sockets.in(roomId).emit('new message', { message: post });
            return res.status(200).json({
                success: true,
                msg: "message send",
                data: {userSender, room}
            });

        } catch (err) {
            next(err)
        }
    }
}

module.exports = ChatController;