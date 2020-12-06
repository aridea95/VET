const { Veterinary } = require("../models/veterinary");
const { User } = require('../models/user');

class VeterinaryController {
    static async getVeterinary(req, res, next) {
        try {
            let veterinaries = await User
                .find({ role: 'veterinary' })
                .select(['-password', '-createdAt', '-updatedAt'])
                .populate({ path: 'veterinary', populate: { path: 'schedules', select: ['-createdAt', '-updatedAt'] }, select: ['-createdAt', '-updatedAt'] });

            res.status(200).json({
                success: true,
                message: "Success retrive veterinary list",
                data: veterinaries,
            });
        } catch (err) {
            next(err)
        }
    }

    static async createVeterinary(req, res, next) {
        try {
            let obj = {};
            // const userID = req.userData._id;

            const { gender, schedules, status, experience } = req.body;

            if (gender) obj.gender = gender;
            if (schedules) obj.schedules = schedules;
            if (status) obj.status = status;
            if (experience) obj.experience = experience;

            let veterinary = await Veterinary.create(obj);

            res.status(201).json({
                success: true,
                message: "Veterinary Has Been Created",
                data: veterinary,
            });
        } catch (err) {
            next(err);
        }
    }

    static async editFormVeterinary(req, res, next) {
        const id = req.params.id;

        try {
            const veterinary = await Veterinary.findOne({
                where: { id }
            })
            res.status(200).json(veterinary)
        } catch (err) {
            next(err);
        }
    }

    static async findVeterinaryById(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "Missing ID Params" });

            const updatedData = await Veterinary.findByIdAndUpdate(
                id, { $set: req.body }, { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Veterinary profile has been Updated.",
                data: updatedData,
            });
        } catch (err) {
            next(err);
        }
    };

    static async deleteVeterinary(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "ID params not found" });

            const deletedData = await Veterinary.findByIdAndRemove(id, (error, doc, result) => {
                if (error) throw "Failed to delete";
                if (!doc)
                    return res.status(400).json({ success: false, err: "Data not found!" });

                res.status(200).json({
                    success: true,
                    message: "Veterinary data has been deleted.",
                    data: deletedData,
                });
            });
        } catch (err) {
            next(err);
        }
    }

    static async online (req, res, next) {
        try {
            const { _id } = req.userData
            const { id } = req.params

            const find = await User.findById(_id)
            let found = {}

            if(find.role === 'veterinary') {
                
                const result = await Veterinary
                .findByIdAndUpdate(id, { $set: { status: "online" } }, { new: true })
                found = result
            }

            res.status(200).json({
            success: true,
            message: "Veterinary Online",
            data: found
            })

        } catch (err) {
            next(err);
        }
    }

}

module.exports = VeterinaryController