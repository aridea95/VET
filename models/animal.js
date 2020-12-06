const mongoose = require("mongoose");
const { Schema } = mongoose;

const animalSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter animal name!']
    },
    type: {
        type: String,
        required: [true, 'Please enter animal type!']
    },
    gender: {
        type: Boolean,
        required: [true, 'Please enter animal gender']
    }
}, { timestamps: true, versionKey: false });

exports.Animal = mongoose.model("Animal", animalSchema);