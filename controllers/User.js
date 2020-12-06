const { User } = require('../models/user');
const { Clinic } = require('../models/clinic');
const { Patient } = require('../models/patient');
const { Veterinary } = require('../models/veterinary');
const { tokenGenerator } = require('../helpers/jwt');
const { decryptPassword } = require('../helpers/bcrypt');
const moment = require('moment')

class UserController {
    static async register(req, res, next) {
        try {
            let obj = {};
            const { name, email, phone, password, role } = req.body;
            if (name) obj.name = name;
            if (email) obj.email = email;
            if (phone) obj.phone = phone;
            if (password) obj.password = password;
            if (role) {
                obj.role = role;
                switch (role) {
                    case "clinic":
                        obj.clinic = await Clinic.create({});
                        obj.image = 'https://img.icons8.com/ios/452/clinic.png';
                        break;
                    case "patient":
                        obj.patient = await Patient.create({});
                        "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png";
                        break;
                    case "veterinary":
                        obj.veterinary = await Veterinary.create({});
                        obj.image = 'https://www.pngfind.com/pngs/m/53-531301_png-file-svg-doctor-icon-png-free-transparent.png';
                        break;
                    default:
                        break;
                }
            }
            let result = await User.create(obj);
            const access_token = tokenGenerator(result);
            res.status(200).json({
                success: true,
                message: "Successfully registered!",
                access_token
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) next({ message: "Please enter your email" });
            if (!password) next({ message: "Please enter your password!" });

            const find = await User.findOne({ email });
            if (!find) next({ message: "Account not found!" });

            if (decryptPassword(password, find.password)) {
                const access_token = tokenGenerator(find);
                res.status(200).json({
                    success: true,
                    message: "Login success!",
                    access_token
                });
            } else {
                next({ message: "Password incorrect!" })
            }
        } catch (err) {
            next(err);
        }
    }

    static async getUser(req, res, next) {
        try {
            let result = await User
                .find()
                .select("-password")
                .populate(['clinic', 'veterinary'])
                .populate({ path: "patient", populate: "animals" });

            res.status(200).json({
                success: true,
                message: "Successfully showing all users!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async editUserForm(req, res, next) {
        try {
            const { _id } = req.userData;
            const user = await User
                .findById(_id)
                .select('-password')
                .populate(['clinic', 'veterinary'])
                .populate({ path: "patient", populate: "animals" });

            let result = { user }
            if (user.role === 'patient') {
                result.totalAnimals = (user.patient.animals).length;
            };

            let activedCount = moment(new Date()).diff(moment(new Date(user.createdAt)), 'years');
            result.activedCount = activedCount;
            res.status(200).json({
                success: true,
                message: "Successfully showing user!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async editUser(req, res, next) {
        try {
            const { _id } = req.userData;
            const { name, phone } = req.body;
            let user = {};
            if (req.file && req.file.fieldname && req.file.path)
                user.image = req.file.path;
            if (name) user.name = name;
            if (phone) user.phone = phone;
            const find = await User.findById(_id)
            switch (find.role) {
                case "clinic":
                    const { city, address, about } = req.body;
                    let clinic = {};
                    if (city) clinic.city = city;
                    if (address) clinic.address = address;
                    if (about) clinic.about = about;
                    await Clinic.findByIdAndUpdate(find.clinic, { $set: clinic });
                    break;
                case "patient":
                    let { gender } = req.body;
                    let patient = {};
                    if (gender) patient.gender = gender;
                    await Patient.findByIdAndUpdate(find.patient, { $set: patient });
                    break;
                case "veterinary":
                    let { schedules, status, experience, genderVet } = req.body;
                    // gender = req.body.gender;
                    let veterinary = {};
                    if (genderVet) veterinary.genderVet = genderVet;
                    if (schedules) veterinary.schedules = schedules;
                    if (status) veterinary.status = status;
                    if (experience) veterinary.experience = experience;
                    await Veterinary.findByIdAndUpdate(find.veterinary, { $set: veterinary });
                    break;
                default:
                    break;
            }
            const updateUser = await User
                .findByIdAndUpdate(_id, { $set: user }, { new: true })
                .select('-password')
                .populate(['clinic', 'patient', 'veterinary'])
                .populate({ path: "patient", populate: "animals" });

            res.status(200).json({
                success: true,
                message: "Success updating user!",
                data: updateUser
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { _id } = req.userData;
            const user = await User.findById(_id).populate(['clinic', 'patient', 'veterinary']);
            if (user.role == "clinic") await Clinic.findByIdAndDelete(user.clinic);
            if (user.role == "patient") await Patient.findByIdAndDelete(user.patient);
            if (user.role == "veterinary") await Veterinary.findByIdAndDelete(user.veterinary);

            const result = await User
                .findByIdAndDelete(_id)
                .select('-passwords')
                .populate(['clinic', 'veterinary'])
                .populate({ path: "patient", populate: "animals" });

            if (!result) return next({ message: "User not found!" })
            res.status(200).json({
                success: true,
                message: "Success deleting user!",
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

}
module.exports = UserController;