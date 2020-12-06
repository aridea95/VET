const { Clinic } = require('../models/clinic');
const { User } = require('../models/user');
const { Veterinary } = require('../models/veterinary');
const { Schedule } = require('../models/schedule');
const { Facility } = require('../models/facility');

class ClinicController {
    static async createClinic(req, res, next) {
        try {
            let obj = {};
            const { city, address, about } = req.body;

            if (city) obj.city = city;
            if (address) obj.address = address;
            if (about) obj.about = about;

            let result = Clinic.create(obj);
            res.status(200).json({
                success: true,
                message: "Success creating Clinic!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async getClinic(req, res, next) {
        const { page } = req.query;
        let limit = 8;

        try {
            let result = await User
                .find({ role: 'clinic' })
                .select(['-password'])
                .populate({ path: 'clinic', populate: 'schedules' })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            // get total documents in the Clinic collection 
            const count = await User.countDocuments({ role: 'clinic' });
            // console.log(count)

            res.status(200).json({
                success: true,
                message: "Successfully retrieve the role!",
                data: result,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (err) {
            next(err);
        }
    }

    static async editClinic(req, res, next) {
        try {
            const { id } = req.params;
            const { city, address, about } = req.body;
            let obj = {};
            if (city) obj.city = city;
            if (address) obj.address = address;
            if (about) obj.about = about;

            const update = await Clinic.findByIdAndUpdate(
                id, { $set: obj }, { new: true }
            )
            res.status(200).json({
                success: true,
                message: "Success updating Clinic!",
                data: update
            });
        } catch (err) {
            next(err);
        }
    }

    static async addSchedule(req, res, next) {
        try {
            const UserId = req.userData._id;
            const { VetId, day, shift } = req.body;
            const user = await User.findById(UserId);
            const clinic = await Clinic.findById(user.clinic);
            const vet = await User.findById(VetId);
            let obj = {};
            VetId ? obj.veterinary = VetId : next({ message: 'Please enter User Veterinary id!' });
            day ? obj.day = day : next({ message: 'Please choose the day!' });
            shift ? obj.shift = shift : next({ message: 'Please choose the shift!' });
            obj.clinic = UserId;
            const schedule = await Schedule.create(obj);
            await Veterinary
                .findByIdAndUpdate(
                    vet.veterinary, { $push: { schedules: schedule } }
                );

            const update = await Clinic
                .findByIdAndUpdate(
                    clinic._id, { $push: { schedules: schedule } }, { new: true }
                )
                .select("schedules")
                .populate({ path: 'schedules', populate: 'veterinary' });

            res.status(200).json({
                success: true,
                message: "Success adding Veterinary to Clinic!",
                data: update
            });
        } catch (err) {
            next(err);
        }
    };

    static async removeSchedule(req, res, next) {
        try {
            const ScheduleId = req.params.ScheduleId;
            const schedule = await Schedule.findById(ScheduleId);

            const userClinic = await User.findById(schedule.clinic);
            const userVeterinary = await User.findById(schedule.veterinary);

            const update = await Clinic
                .findByIdAndUpdate(
                    userClinic.clinic, { $pull: { schedules: ScheduleId } }, { new: true }
                )
                .select("schedules")
                .populate({ path: 'schedules', populate: 'veterinary' });

            await Veterinary
                .findByIdAndUpdate(userVeterinary.veterinary, { $pull: { schedules: ScheduleId } });

            await Schedule.findByIdAndDelete(ScheduleId);
            res.status(200).json({
                success: true,
                message: "Success deleting Veterinary from Clinic!",
                data: update
            });
        } catch (err) {
            next(err);
        }
    };

    static async addFacilities(req, res, next) {
        try {
            const UserId = req.userData._id;
            const facilities = req.body.FacilityId;

            const user = await User.findById(UserId);
            const clinic = await Clinic
                .findById(user.clinic)
            let different = [];
            let same = [];
            let result = {}
            if (typeof facilities == 'object') {
                facilities.forEach(inputFacility => {
                    (clinic.facilities).includes(inputFacility) ? same.push(inputFacility) : different.push(inputFacility);
                });
            } else {
                different = facilities;
            }
            await Clinic
                .findByIdAndUpdate(user.clinic, { $push: { facilities: different } })

            if (different.length) result.successToAdd = await Facility.find({ _id: different }).select("name");
            if (same.length) result.failedToAdd = await Facility.find({ _id: same }).select("name");

            res.status(200).json({
                success: true,
                message: "Success adding Facility to Clinic!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    };

    static async removeFacilities(req, res, next) {
        try {
            const UserId = req.userData._id;
            const facilities = req.body.FacilityId;

            const user = await User.findById(UserId);
            const clinic = await Clinic
                .findById(user.clinic)
            let different = [];
            let same = [];
            let result = {}
            if (typeof facilities == 'object') {
                facilities.forEach(inputFacility => {
                    (clinic.facilities).includes(inputFacility) ? same.push(inputFacility) : different.push(inputFacility);
                });
            } else {
                same = facilities;
            }
            const update = await Clinic
                .findByIdAndUpdate(user.clinic, { $pull: { facilities: same } })

            if (same.length) result.successToRemove = await Facility.find({ _id: same }).select("name");
            if (different.length) result.failedToRemove = await Facility.find({ _id: different }).select("name");

            res.status(200).json({
                success: true,
                message: "Success deleting Facility from Clinic!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    };

    static async filterClinic(req, res, next) {
        try {
            const { facilities } = req.body;
            const { city } = req.query;
            let result = [];

            if (facilities) {
                result = await Clinic.find({ city, facilities }).select('_id');
            }
            // else if (name) {
            //     result = await User.find({"name": {$regex:name} }).select('_id')
            // }
            else {
                result = await Clinic.find({ city }).select('_id');
            }
            const users = await User
                .find({ clinic: result })
                .select(['-password', '-createdAt', '-updatedAt'])
                .populate({
                    path: 'clinic',
                    select: ['-createdAt', '-updatedAt', '-chats', '-reservations', '-schedules'],
                    populate: {
                        path: 'facilities',
                        select: ['name', '_id']
                    }
                })
            res.status(200).json({
                success: true,
                message: "Filter clinic success!",
                data: users
            });
        } catch (err) {
            next(err);
        }
    };

    static async addVet(req, res, next) {
        try {
            const UserId = req.userData._id;
            const { VetId } = req.params;
            const user = await User.findById(UserId);
            const clinic = await Clinic
                .findByIdAndUpdate(user.clinic, { $push: { veterinaries: VetId } }, { new: true })
                .populate({
                    path: 'veterinaries',
                    select: 'name'
                });

            let response = {
                name: user.name,
                veterinaries: clinic.veterinaries
            };

            res.status(200).json({
                success: true,
                message: "Success adding Veterinary to Clinic!",
                data: response
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteVet(req, res, next) {
        try {
            const UserId = req.userData._id;
            const { VetId } = req.params;
            const user = await User.findById(UserId);
            const clinic = await Clinic
                .findByIdAndUpdate(user.clinic, { $pull: { veterinaries: VetId } }, { new: true })
                .populate({
                    path: 'veterinaries',
                    select: 'name'
                });

            let response = {
                name: user.name,
                veterinaries: clinic.veterinaries
            };
            res.status(200).json({
                success: true,
                message: "Success deleting Veterinary to Clinic!",
                data: response
            });
        } catch (err) {
            next(err);
        }
    }

    static async filterClinicByName(req, res, next) {
        try {
            const { name } = req.query;
            const clinic = await User
                .find({ "name": { $regex: name }, "role": "clinic" })
                .select(['-password', '-createdAt', '-updatedAt'])
                .populate({
                    path: 'clinic',
                    select: ['-createdAt', '-updatedAt', '-chats', '-reservations', '-schedules'],
                    populate: {
                        path: 'facilities',
                        select: ['name', '_id']
                    }
                })

            res.status(200).json({
                success: true,
                message: "Successfully get a Clinic!",
                data: clinic,
            });
        } catch (err) {
            next(err)
        }
    }

    static async listVet(req, res, next) {
        try {
            const UserId = req.userData._id;
            const user = await User.findById(UserId);
            const clinic = await Clinic
                .findById(user.clinic)
                .populate({
                    path: 'veterinaries',
                    select: ['name', 'image']
                });

            let response = {
                name: user.name,
                veterinaries: clinic.veterinaries
            };

            res.status(200).json({
                success: true,
                message: "Success showing Veterinaries by Clinic!",
                data: response
            });
        } catch (err) {

        }
    }

    static async online(req, res, next) {
        try {
            const { _id } = req.userData
            const { id } = req.params

            const find = await User.findById(_id)
            let found = {}

            if (find.role === 'clinic') {

                const result = await Clinic
                    .findByIdAndUpdate(id, { $set: { status: "online" } }, { new: true })
                found = result
            }

            res.status(200).json({
                success: true,
                message: "Clinic Online",
                data: found
            })

        } catch (err) {
            next(err);
        }
    }

    static async getAll(req, res, next) {
        try {
            const clinics = await User
                .find({ role: 'clinic' })
                .select(['-password', '-createdAt', '-updatedAt'])
                .populate({ path: 'clinic', select: ['-reservations', '-chats', '-createdAt', '-updatedAt'], populate: ['schedules', 'facilities'] });

            res.status(200).json({
                success: true,
                message: "Success showing All Clinic without pagination",
                data: clinics
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ClinicController;