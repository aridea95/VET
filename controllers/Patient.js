const { Patient } = require("../models/patient");
const { User } = require('../models/user')

class PatientController {
    static async getPatient(req, res, next) {
        try {
            let patients = await User
                .find({ role: 'patient' })
                .select(['-password'])
                .populate({ path: 'patient', populate: 'animals' });

            res.status(200).json({
                success: true,
                message: "Berhasil menapi!",
                data: patients,
            });
        } catch (err) {
            next(err);
        }
    };

    static async createPatient(req, res, next) {
        try {
            let obj = {};
            const userID = req.userData._id;

            const gender = Boolean(req.body.gender);

            if (gender) obj.gender = gender;

            let patient = await Patient.create(obj);

            res.status(201).json({
                success: true,
                message: "Successfully create a patient profile!",
                data: patient,
            });
        } catch (err) {
            next(err);
        }
    };

    static async findPatientById(req, res, next) {
        const id = req.params.id;

        try {
            const patient = await Patient.findOne({ id })

            res.status(200).json({
                success: true,
                message: "Successfully get a patient!",
                data: patient,
            });
        } catch (err) {
            next(err)
        }
    }
    static async editPatient(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "Missing ID Params" });

            const updatedData = await Patient.findByIdAndUpdate(
                id, { $set: req.body }, { new: true }
            );

            res.status(200).json({
                success: true,
                message: "Successfully update a patient!",
                data: updatedData,
            });
        } catch (err) {
            next(err);
        }
    };

    static async deletePatient(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "Missing ID Params" });

            await Patient.findByIdAndRemove(id, (error, doc, result) => {
                if (error) throw "Failed to delete";
                if (!doc)
                    return res.status(400).json({ success: false, err: "Data not found!" });

                res.status(200).json({
                    success: true,
                    message: "Successfully delete patient!",
                    data: doc
                });
            });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = PatientController