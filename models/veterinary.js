const mongoose = require("mongoose");
const { Schema } = mongoose;

const veterinarySchema = new Schema({
    genderVet: {
        type: Boolean,
        default: false,
    },
    schedules: [{ type: Schema.Types.ObjectId, ref: "Schedule", default: null }],
    experience: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        default: "offline",
        enum: ["online", "offline"]
    }
}, { timestamps: true, versionKey: false });

const veterinary = mongoose.model("Veterinary", veterinarySchema);

exports.Veterinary = veterinary