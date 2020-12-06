const mongoose = require("mongoose");
const { Schema } = mongoose;
const { encryptPassword } = require("../helpers/bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, `Please enter your name!`]

    },
    email: {
        type: String,
        required: [true, `Please enter your email!`],
        lowercase: true,
        // uniqueCaseInsensitive: true,
        unique: true,
        match: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, `Email format is incorrect!`]
    },
    phone: {
        type: String,
        required: [true, `Please enter your phone number!`],
        match: [
            /\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/,
            `The phone number format is incorrect! Examples: +6281234123412 or 08123412312`
        ],
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png"
    },
    password: {
        type: String,
        required: [true, `Please enter your password!`],
        match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, `Password should have a minimum of 6 characters, minimum of 1 alphabet character, dan 1 numeric character!`]
    },
    role: {
        type: String,
        enum: ['patient', 'clinic', 'veterinary'],
        required: [true, 'Please choose your role!']
    },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
    veterinary: { type: Schema.Types.ObjectId, ref: "Veterinary" },
    clinic: { type: Schema.Types.ObjectId, ref: "Clinic" },
    chats: [{ type: Schema.Types.ObjectId, ref: "Chat", default: null }]
}, { timestamps: true, versionKey: false });

userSchema.pre("save", async function(next) {
    let user = this;
    if (user.password && user.isModified("password")) {
        user.password = await encryptPassword(user.password);
    }
    next();
});

userSchema.post("save", (error, doc, next) => {
    let errorMessage = {};
    if (error.errors.name) errorMessage.name = error.errors.name.properties.message;
    if (error.errors.email) {
        if (error.errors.email.kind === 'unique') {
            errorMessage.email = `Email already used, use another email!`
        } else {
            errorMessage.email = error.errors.email.properties.message
        }
    };
    if (error.errors.phone) errorMessage.phone = error.errors.phone.properties.message;
    if (error.errors.password) errorMessage.password = error.errors.password.properties.message;
    if (error.errors.role) errorMessage.role = error.errors.role.properties.message;
    if (error) {
        next({ message: errorMessage });
    } else {
        next();
    }
});



// unique validator
userSchema.plugin(uniqueValidator);

exports.User = mongoose.model("User", userSchema);