const mongoose = require("mongoose");
const { Schema } = mongoose;

const animalTypeSchema = new Schema({
    type: {
        type: String,
        required: [true, 'Please enter animal type!']
    }
}, { timestamps: true, versionKey: false });

exports.AnimalType = mongoose.model("AnimalType", animalTypeSchema);