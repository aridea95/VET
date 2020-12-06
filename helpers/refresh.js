const { Schedule } = require('../models/schedule');
const { Reservation } = require('../models/reservation');
const email = require('./email');

module.exports = async() => {
    console.log(new Date())
    const reservations = await Reservation
        .find({ status: 'approved' })
        .select(['schedule', 'date', 'status']);

    const pendingReservations = await Reservation
        .find({ status: 'pending' })
        .select(['schedule', 'date', 'status']);

    let now = new Date();
    let schedules = [];
    let reservationIds = [];

    reservations.forEach(reservation => {
        if (reservation.date < now) {
            schedules.push(reservation.schedule);
            reservationIds.push(reservation._id);
        }
    });

    const updateReservation = await Reservation
        .findByIdAndUpdate(reservationIds, { $set: { status: 'finished' }, }, { new: true });

    let pendingReservationIds = [];
    pendingReservations.forEach(reservation => {
        if (reservation.date < now) {
            schedules.push(reservation.schedule);
            pendingReservationIds.push(reservation._id);
        }
    });

    const rejectReservation = await Reservation
        .findByIdAndUpdate(pendingReservationIds, { $set: { status: 'rejected' }, }, { new: true });

    const updateSchedule = await Schedule
        .findByIdAndUpdate(schedules, { $set: { isBooked: false } }, { new: true });

    pendingReservationIds.forEach(reservation => {
        reservationIds.push(reservation);
    });


    reservationIds.forEach(id => {
        email(id);
    });
}