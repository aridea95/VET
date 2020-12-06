const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const clinicSchema = new Schema({
    status: {
        type: String,
        default: "offline",
        enum: ["online", "offline"]
    },
    city: {
        type: String,
        trim: true,
        default: null
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    about: String,
    veterinaries: [{ type: Schema.Types.ObjectId, ref: "User", default: null }],
    schedules: [{ type: Schema.Types.ObjectId, ref: "Schedule", default: null }],
    facilities: [{ type: Schema.Types.ObjectId, ref: "Facility", default: null, uniqueValidator: true }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation", default: null }]
}, { timestamps: true, versionKey: false });

// unique validator
clinicSchema.plugin(uniqueValidator);
exports.Clinic = mongoose.model("Clinic", clinicSchema);