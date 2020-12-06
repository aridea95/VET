const { Facility } = require('../models/facility');

class FacilityController {
    static async createFacility(req, res, next) {
        try {
            const { name } = req.body;
            let obj = {}

            if (name) obj.name = name;
            let result = await Facility.create(obj);
            res.status(200).json({
                success: true,
                message: "Successfully create a Facility!",
                data: result
            });
        } catch (err) {
            next(err);

        }
    }

    static async getFacility(req, res, next) {
        try {
            let result = await Facility.find().select('name');
            res.status(200).json({
                success: true,
                message: "Success retrieve facilities!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteFacility(req, res, next) {
        try {
            const { id } = req.params;

            if (!id) return next({ message: "Missing ID Params" });

            await Facility.findByIdAndRemove(id, (error, doc, result) => {
                if (error) throw "Failed to delete";
                if (!doc)
                    return next({ message: "Data not found!" });

                res.status(200).json({
                    success: true,
                    message: "Successfully delete the facility!",
                    data: doc
                });
            });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = FacilityController;