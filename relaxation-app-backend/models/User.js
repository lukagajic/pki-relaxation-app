const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    forename: {
        type: String,
        required: true,
        min: 3,
        max: 64
    },
    surname: {
        type: String,
        required: true,
        min: 3,
        max: 80
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 64
    },
    city: {
        type: String,
        enum: ['Beograd', 'Nis', 'Novi Sad', 'Subotica', 'Kragujevac']
    },
    bornAt: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    interests: {
        type: [ { type: String, enum: ['sports', 'movies', 'music', 'fun', 'theatre'] } ],
        required: true
    },
    joinedEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    address: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;