const { AnimalType } = require('../models/animalType');

class AnimalTypeController {
    static async createAnimalType(req, res, next) {
        try {
            const { type } = req.body;
            let obj = {}

            if (type) obj.type = type;
            let result = await AnimalType.create(obj);

            res.status(200).json({
                success: true,
                message: "Success adding Animal Type!",
                data: result
            });
        } catch (err) {
            next(err);

        }
    }

    static async getAnimalType(req, res, next) {
        try {
            let result = await AnimalType
                .find()
                .select(['-createdAt', '-updatedAt']);

            res.status(200).json({
                success: true,
                message: "Success showing Animal Types!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteAnimalType(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "Missing ID Params" });

            await AnimalType.findByIdAndRemove(id, (error, doc, result) => {
                if (error) throw "Failed to delete";
                if (!doc)
                    return next({ message: "Data not found!" });

                res.status(200).json({
                    success: true,
                    message: "Success deleting Animal Type!",
                    data: doc
                });
            });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = AnimalTypeController;