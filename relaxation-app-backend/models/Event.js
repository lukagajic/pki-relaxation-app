const mongoose = require('mongoose');
const UserSchema = require('./User').Schema;

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 100,
        required: true
    },
    description: {
        type: String,
        min: 5,
        required: true
    },
    category: {
        type: String,
        enum: ['sports', 'movies', 'music', 'fun', 'theatre'],
        required: true
    },
    city: {
        type: String,
        enum: ['Beograd', 'Nis', 'Novi Sad', 'Subotica', 'Kragujevac']
    },
    address: {
        type: String,
        required: true
    },
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0.0
    },
    expectedAttendance: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Regular', 'Cancelled'],
        default: 'Regular'
    }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;