const { Reservation } = require("../models/reservation");
const { User } = require("../models/user");
const { Schedule } = require("../models/schedule");
const { Patient } = require('../models/patient');
const email = require('../helpers/email');

const moment = require('moment')
const mongoose = require("mongoose");
const { Clinic } = require("../models/clinic");

class ReservationController {
    static async formReservation(req, res, next) {
        try {
            let ClinicId = req.params.id;
            let nextDate = new Date();
            let dateBooking = [];

            let i = 1;
            while (i <= 7) {
                nextDate = moment(nextDate).add(1, 'days').toDate();
                dateBooking.push(moment(nextDate).format('dddd, D MMMM yyyy'));
                i++;
            };
            console.log(dateBooking)

            let hour = ["9:00 AM-12:00 PM", "12:30 PM-03:30 PM", "4:00 PM-7:00 PM"];
            let clinic = await User
                .findById(ClinicId)
                .select(['image', 'name'])
                .populate({
                    path: 'clinic',
                    model: 'Clinic',
                    select: ['facilities', 'about'],
                    populate: {
                        path: 'facilities',
                        model: 'Facility',
                        select: 'name'
                    }
                })


            res.status(200).json({
                success: true,
                message: "Successfully get form booking!",
                data: { dateBooking, hour, clinic }
            });
        } catch (err) {
            next(err);
        }
    };

    static async chooseDateReservation(req, res, next) {
        try {
            const { dateReservation, hourReservation } = req.body;
            const clinicID = req.params.id;

            dateReservation ? dateReservation : next({ message: "Masukkan dateReservation!" })
            hourReservation ? hourReservation : next({ message: "Masukkan hourReservation!" })
            clinicID ? clinicID : next({ message: "Masukkan clinicID!" })

            let shift = ["09.00", "12.30", "16.00"]
            let chooseShift = shift[hourReservation]
            let [hour, minute] = chooseShift.split(".")
            let nextDate = new Date();

            nextDate = moment(nextDate).add(Number(dateReservation), 'days').toDate()
            nextDate.setHours(Number(hour));
            nextDate.setMinutes(Number(minute));

            let day = nextDate.getDay();
            let schedules = await Schedule.find({ clinic: clinicID, day, shift: hourReservation, isBooked: false })
                .select(['veterinary'])
                .populate({ path: 'veterinary', select: ['name', 'image'] });


            const clinic = await User
                .findById(clinicID)
                .select(['name', 'image']);

            let result = { clinic, schedules, reservationDate: nextDate }

            res.status(200).json({
                success: true,
                message: "Successfully show list veterinaries!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    };

    static async createReservation(req, res, next) {
        try {
            const userId = req.userData._id;
            const user = await User.findById(userId);
            const scheduleID = req.params.id;
            let obj = {};
            const { animalId, dateReservation } = req.body;

            scheduleID ? scheduleID : next({ message: "Choose the Veterinary!" })
            animalId ? animalId : next({ message: "Input your Pets!" })
            dateReservation ? dateReservation : next({ message: "Choose your date reservation!" })

            obj.date = new Date(dateReservation)
            obj.patient = userId;
            obj.schedule = scheduleID;
            obj.animals = animalId;
            obj.status = 'pending';

            const schedule = await Schedule.findByIdAndUpdate(scheduleID, { $set: { isBooked: true } });
            const userClinic = await User.findById(schedule.clinic);

            let result = await Reservation
                .findOneAndUpdate({
                        _id: mongoose.Types.ObjectId()
                    },
                    obj, {
                        new: true,
                        upsert: true, // create the data if not exist
                        runValidators: true,
                        setDefaultsOnInsert: true, // set default value based on models
                    }
                )
                .select(['status', 'patient', 'schedule', 'date'])
                .populate({ path: 'patient', select: 'name' })
                .populate({
                    path: 'schedule',
                    populate: [
                        { path: 'clinic', select: 'name' },
                        { path: 'veterinary', select: 'name' }
                    ],
                    select: ['clinic', 'veterinary']
                })
                .populate({ path: 'animals', select: ['name', 'gender', 'type'] });
            email(result._id);
            await Patient.findByIdAndUpdate(user.patient, { $push: { reservations: result._id } });
            await Clinic.findByIdAndUpdate(userClinic.clinic, { $push: { reservations: result._id } });

            res.status(200).json({
                success: true,
                message: "Successfully create Reservation!",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    static async getReservation(req, res, next) {
        try {
            let reservations = await Reservation.find()
                .populate(['patient', 'animals'])
                .populate({ path: 'schedule', populate: ['clinic', 'veterinary'] });

            res.status(200).json({
                success: true,
                message: "Successfully show all reservation!",
                data: reservations,
            });
        } catch (err) {
            next(err);
        }
    };


    static async getReservationByPatient(req, res, next) {
        try {
            const UserId = req.userData._id;
            let reservations = await Reservation.find({ patient: UserId })
                .select(['animals', 'schedule', 'date', 'status'])
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: [{
                        path: 'clinic',
                        select: ['image', 'name']
                    }, {
                        path: 'veterinary',
                        select: ['image', 'name']
                    }],
                    select: ['clinic', 'veterinary']
                });

            let tanggal = [];
            reservations.map(reservation => {
                tanggal.push(moment(new Date(reservation.date)).format('D MMM'));
            });

            res.status(200).json({
                success: true,
                message: "Success show reservation by Patient!",
                data: { reservations, tanggal }
            });
        } catch (err) {
            next(err);
        }
    }

    static async getReservationByClinic(req, res, next) {
        try {
            const UserId = req.userData._id;

            const schedules = await Schedule.find({ clinic: UserId });
            let schedulesIds = [];
            schedules.forEach(schedule => {
                schedulesIds.push(schedule._id)
            });

            const reservations = await Reservation.find({ schedule: schedulesIds })
                .select(['animals', 'schedule', 'date', 'status', 'patient'])
                .populate({ path: 'patient', select: 'name' })
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: {
                        path: 'veterinary',
                        select: ['image', 'name']
                    },
                    select: 'veterinary'
                });


            let tanggal = [];
            reservations.map(reservation => {
                tanggal.push(moment(new Date(reservation.date)).format('D MMM'));
            });

            res.status(200).json({
                success: true,
                message: "Success show reservation by clinic!",
                data: { reservations, tanggal }
            });
        } catch (err) {
            next(err);
        }
    }

    static async showHistoryPatient(req, res, next) {
        try {
            const status = ["rejected", "finished"];
            const UserId = req.userData._id;

            const reservations = await Reservation.find({ patient: UserId, status })
                .select(['animals', 'schedule', 'date', 'status'])
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: [{
                        path: 'clinic',
                        select: ['image', 'name'],
                        populate: {
                            path: 'clinic',
                            select: 'city'
                        }
                    }, {
                        path: 'veterinary',
                        select: ['image', 'name']
                    }],
                    select: ['clinic', 'veterinary']
                });

            let times = [];
            let time = {};
            reservations.map(reservation => {
                time = {};
                time.tanggal = moment(new Date(reservation.date)).format('D MMM');
                time.jam = moment(new Date(reservation.date)).format('LT');
                times.push(time);
            });

            res.status(200).json({
                success: true,
                message: "Success show History Patient!",
                data: { reservations, times }
            });

        } catch (err) {
            next(err);
        }
    }

    static async showAppointmentPatient(req, res, next) {
        try {
            const status = ["pending", "approved"]
            const UserId = req.userData._id;
            const reservations = await Reservation.find({ patient: UserId, status })
                .select(['animals', 'schedule', 'date', 'status'])
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: [{
                        path: 'clinic',
                        select: ['image', 'name'],
                        populate: {
                            path: 'clinic',
                            select: 'city'
                        }
                    }, {
                        path: 'veterinary',
                        select: ['image', 'name']
                    }],
                    select: ['clinic', 'veterinary']
                });

            let times = [];
            let time = {};
            reservations.map(reservation => {
                time = {};
                time.tanggal = moment(new Date(reservation.date)).format('D MMM');
                time.jam = moment(new Date(reservation.date)).format('LT');
                times.push(time);
            });

            res.status(200).json({
                success: true,
                message: "Success show Patient Appointment!",
                data: { reservations, times }
            });

        } catch (err) {
            next(err);
        }
    }

    static async showHistoryClinic(req, res, next) {
        try {
            const status = ["rejected", "finished"]
            const UserId = req.userData._id;
            const schedule = await Schedule.find({ clinic: UserId });
            const reservations = await Reservation.find({ schedule, status })
                .select(['animals', 'schedule', 'date', 'status', 'patient'])
                .populate({ path: 'patient', select: 'name' })
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: {
                        path: 'veterinary',
                        select: ['image', 'name']
                    },
                    select: 'veterinary'
                });


            let times = [];
            let time = {};
            reservations.map(reservation => {
                time = {};
                time.tanggal = moment(new Date(reservation.date)).format('D MMM');
                time.jam = moment(new Date(reservation.date)).format('LT');
                times.push(time);
            });

            res.status(200).json({
                success: true,
                message: "Success show Clinic History!",
                data: { reservations, times }
            });

        } catch (err) {
            next(err);
        }
    }

    static async showAppointmentClinic(req, res, next) {
        try {
            const status = ["pending", "approved"];
            const UserId = req.userData._id;
            const schedule = await Schedule.find({ clinic: UserId });

            const reservations = await Reservation.find({ schedule, status })
                .select(['animals', 'schedule', 'date', 'status', 'patient'])
                .populate({ path: 'patient', select: 'name' })
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: {
                        path: 'veterinary',
                        select: ['image', 'name']
                    },
                    select: 'veterinary'
                });

            let times = [];
            let time = {};
            reservations.map(reservation => {
                time = {};
                time.tanggal = moment(new Date(reservation.date)).format('D MMM');
                time.jam = moment(new Date(reservation.date)).format('LT');
                times.push(time);
            });

            res.status(200).json({
                success: true,
                message: "Success show Clinic Appointment!",
                data: {
                    reservations,
                    times
                }
            });

        } catch (err) {
            next(err);
        }
    }

    static async showHistoryVeterinary(req, res, next) {
        try {
            const status = ["rejected", "finished"]
            const UserId = req.userData._id;
            const schedule = await Schedule.find({ veterinary: UserId });
            const reservations = await Reservation.find({ schedule, status })
                .select(['animals', 'schedule', 'date', 'status', 'patient'])
                .populate({ path: 'patient', select: 'name' })
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: {
                        path: 'clinic',
                        select: ['image', 'name']
                    },
                    select: 'clinic'
                });


            let times = [];
            let time = {};
            reservations.map(reservation => {
                time = {};
                time.tanggal = moment(new Date(reservation.date)).format('Do MMM');
                time.jam = moment(new Date(reservation.date)).format('LT');
                times.push(time);
            });

            res.status(200).json({
                success: true,
                message: "Success show Veterinary History!",
                data: { reservations, times }
            });

        } catch (err) {
            next(err);
        }
    }

    static async showAppointmentVeterinary(req, res, next) {
        try {
            const status = ["pending", "approved"];
            const UserId = req.userData._id;
            const schedule = await Schedule.find({ veterinary: UserId });

            const reservations = await Reservation.find({ schedule, status })
                .select(['animals', 'schedule', 'date', 'status', 'patient'])
                .populate({ path: 'patient', select: 'name' })
                .populate({ path: 'animals', select: ['-createdAt', '-updatedAt'] })
                .populate({
                    path: 'schedule',
                    populate: {
                        path: 'clinic',
                        select: ['image', 'name']
                    },
                    select: 'clinic'
                });

            let times = [];
            let time = {};
            reservations.map(reservation => {
                time = {};
                time.tanggal = moment(new Date(reservation.date)).format('Do MMM');
                time.jam = moment(new Date(reservation.date)).format('LT');
                times.push(time);
            });

            res.status(200).json({
                success: true,
                message: "Success show Veterinary Appointment!",
                data: {
                    reservations,
                    times
                }
            });

        } catch (err) {
            next(err);
        }
    }

    static async approved(req, res, next) {
        try {
            const reservationId = req.params.id;
            const reservation = await Reservation
                .findByIdAndUpdate(reservationId, { $set: { status: 'approved' } }, { new: true })
                .select(['-createdAt', '-updatedAt'])
                .populate({ path: 'patient', select: 'name' })
                .populate({
                    path: 'schedule',
                    populate: ({ path: 'clinic', select: 'name' }),
                    select: ['clinic', 'veterinary']
                })
                .populate({ path: 'animals ', select: ['name', 'type', 'gender'] });

            let time = {};
            time.tanggal = moment(new Date(reservation.date)).format('D MMM');
            time.jam = moment(new Date(reservation.date)).format('LT');

            email(reservationId);

            res.status(200).json({
                success: true,
                message: "Reservation Approved!",
                data: { reservation, time }
            });

        } catch (err) {
            next(err);
        }
    }

    static async rejected(req, res, next) {
        try {
            const UserId = req.userData._id;
            const reservationId = req.params.id;
            const reservation = await Reservation
                .findByIdAndUpdate(reservationId, { $set: { status: 'rejected' } }, { new: true })
                .select(['-createdAt', '-updatedAt'])
                .populate({ path: 'patient', select: 'name' })
                .populate({
                    path: 'schedule',
                    populate: ({ path: 'clinic', select: 'name' }),
                    select: ['clinic', 'veterinary']
                })
                .populate({ path: 'animals ', select: ['name', 'type', 'gender'] });

            let time = {};
            time.tanggal = moment(new Date(reservation.date)).format('D MMM');
            time.jam = moment(new Date(reservation.date)).format('LT');

            email(reservationId);

            res.status(200).json({
                success: true,
                message: "Reservation Rejected!",
                data: { reservation, time }
            });

        } catch (err) {
            next(err);
        }
    }
}

module.exports = ReservationController