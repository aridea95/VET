const mongoose = require("mongoose");
const { Schema } = mongoose;


const reservationSchema = new Schema({
    status: {
        type: String,
        default: "pending",
        enum: ["approved", "rejected", "pending", "finished"]
    },
    date: {
        type: Date,
        required: [true, 'Choose date Reservation!']
    },
    patient: { type: Schema.Types.ObjectId, ref: "User", default: null },
    schedule: { type: Schema.Types.ObjectId, ref: "Schedule", default: null },
    animals: [{ type: Schema.Types.ObjectId, ref: "Animal", default: null }],
}, { timestamps: true, versionKey: false });



exports.Reservation = mongoose.model("Reservation", reservationSchema);