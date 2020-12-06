const mongoose = require("mongoose");
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    day: {
        type: Number,
        required: [true, 'Masukkan day']
    },
    shift: {
        type: Number,
        required: [true, 'Masukkan shift!']
    },
    clinic: { type: Schema.Types.ObjectId, ref: "User", default: null },
    veterinary: { type: Schema.Types.ObjectId, ref: "User", default: null },
    isBooked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false });

exports.Schedule = mongoose.model("Schedule", scheduleSchema);