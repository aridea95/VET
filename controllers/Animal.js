const { Animal } = require('../models/animal');
const { Patient } = require('../models/patient');
const { User } = require('../models/user');

class AnimalController {
    static async getAnimal(req, res, next) {
        try {
            let animals = await Animal.find();

            res.status(200).json({
                success: true,
                message: "Success retrive Animal list",
                data: animals,
            });
        } catch (err) {
            next(err)
        }
    }

    static async createAnimal(req, res, next) {
        try {
            const { name, type, gender } = req.body;
            let obj = {}

            if (name) obj.name = name;
            if (type) obj.type = type;
            if (gender) obj.gender = gender;
            console.log(obj);

            let result = await Animal.create(obj);

            res.status(200).json({
                success: true,
                message: "Successfully create Animal!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async findAnimalById(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "Missing ID Params" });

            const updatedData = await Animal.findByIdAndUpdate(
                id, { $set: req.body }, { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Showing Animal Profile.",
                data: updatedData,
            });
        } catch (err) {
            next(err);
        }
    };

    static async deleteAnimal(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "ID params not found" });

            const deletedData = await Animal.findByIdAndRemove(id, (error, doc, result) => {
                if (error) throw "Failed to delete";
                if (!doc)
                    return res.status(400).json({ success: false, err: "Data not found!" });

                res.status(200).json({
                    success: true,
                    message: "Animal data has been deleted.",
                    data: deletedData,
                });
            });
        } catch (err) {
            next(err);
        }
    };

    static async addAnimal(req, res, next) {
        try {
            const UserId = req.userData._id;
            let user = await User.findById(UserId);
            if (!user.patient) next({ message: `User not a patient!` });
            const { name, type, gender } = req.body;
            let obj = {};
            if (name) obj.name = name;
            if (type) obj.type = type;
            if (gender) obj.gender = gender;
            const animal = await Animal.create(obj);
            const result = await Patient
                .findByIdAndUpdate(
                    user.patient, { $push: { animals: animal } }, { new: true }
                )
                .select('animals')
                .populate('animals');

            res.status(200).json({
                success: true,
                message: "Success add an Animal!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async removeAnimal(req, res, next) {
        try {
            const UserId = req.userData._id;
            const AnimalId = req.params.id;
            const user = await User.findById(UserId);
            if (!user.patient) next({ message: `User not a Patient!` });
            const patient = await Patient
                .findByIdAndUpdate(
                    user.patient, { $pull: { animals: AnimalId } }, { new: true }
                )
                .select('animals')
                .populate('animals');
            await Animal.findByIdAndDelete(AnimalId);
            res.status(200).json({
                success: true,
                message: "Success deleting Animals!",
                data: patient
            });
        } catch (err) {
            next(err);
        }
    };

    static async getAnimalsByUser(req, res, next) {
        try {
            const UserId = req.userData._id;
            const user = await User.findById(UserId);
            const patient = await Patient
                .findById(user.patient)
                .select('animals')
                .populate('animals');

            let images = [];
            (patient.animals).forEach(animal => {
                switch (animal.type) {
                    case 'Cat':
                        images.push('https://res.cloudinary.com/ddo7w4uot/image/upload/v1605258326/cat_m7m3bh.png');
                        break;
                    case 'Dog':
                        images.push('https://res.cloudinary.com/ddo7w4uot/image/upload/v1605258311/dog_lijmqg.png');
                        break;
                    default:
                        break;
                }
            })
            let temp = {};
            temp.name = user.name;
            temp.animals = patient.animals
            temp.images = images;
            res.status(200).json({
                success: true,
                message: "Success showing Animals!",
                data: temp
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AnimalController