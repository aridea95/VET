const mongoose = require("mongoose");
const { Schema } = mongoose;

const facilitySchema = new Schema({
    name: {
        type: String,
        default: null
    }
}, { timestamps: true, versionKey: false });

exports.Facility = mongoose.model("Facility", facilitySchema);