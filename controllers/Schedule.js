const { Schedule } = require('../models/schedule');

class ScheduleController {
    static async getSchedule(req, res, next) {
        try {
            const schedules = await Schedule.find();
            res.status(200).json({
                success: true,
                message: "Success showing schedules!",
                data: schedules
            });
        } catch (err) {
            next(err);
        }
    };

    static async getScheduleByTime(req, res, next) {
        try {
            const { ClinicId } = req.params;
            const { day, shift } = req.body;
            const vets = await Schedule
                .find({ clinic: ClinicId, day, shift, isBooked: false })
                .select('veterinary')
                .populate('veterinary');
            let vetResult = [];
            let vetTemp = {};

            vets.forEach(vet => {
                vetTemp = {};
                vetTemp.ScheduleId = vet._id;
                vetTemp.VetId = vet.veterinary._id;
                vetTemp.name = vet.veterinary.name;
                vetTemp.image = vet.veterinary.image;
                vetResult.push(vetTemp);
            })
            res.status(200).json({
                success: true,
                message: "Success showing schedules by time!",
                data: vetResult
            });
        } catch (err) {
            next(err);
        }
    };
};
module.exports = ScheduleController;