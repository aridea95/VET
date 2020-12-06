const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new Schema({
    gender: {
        type: Boolean,
        default: false
    },
    animals: [{ type: Schema.Types.ObjectId, ref: "Animal", default: null }],
    reservations: [{ type: Schema.Types.ObjectId, ref: "Reservations", default: null }]
}, { timestamps: true, versionKey: false });



exports.Patient = mongoose.model("Patient", patientSchema);