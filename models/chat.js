const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    message: {
        type: Array,
        default: null
    }

}, { timestamps: true, versionKey: false });

exports.Chat = mongoose.model("Chat", chatSchema);