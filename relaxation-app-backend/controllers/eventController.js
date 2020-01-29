const Event = require('../models/Event');
const User = require('../models/User');

module.exports.getAllEvents = (req, res) => {
	Event.find({}, (err, data) => {
        if(err) throw err;
        res.json(data);
    })
};

module.exports.getFinishedEvents = (req, res) => {
    const query = Event.find({});

    query.where('endsAt').lt(new Date());

    query.exec((err, events) => {
        if(err) {
            throw err;
        } else {
            res.json(events);
        }
    })
}

module.exports.addEvent = (req, res) => { 
	Event.create(req.body, (err, data) => {
        if(err) throw err;
        res.json(data);
    });
}

module.exports.rateEvent = (req, res) => {
    const ratingToUpdate = {
        rating: req.body.rating
    };

	Event.findOneAndUpdate(req.params._id, { $set: ratingToUpdate }, (err, data) => {
        if(err) {
            throw err
        } else {
            res.status(200).json({
                success: true,
                message: 'Event successfully rated'
            });
        }
    });
}

module.exports.updateEvent = (req, res) => {
    const event = {
        name: req.body.name,
        description: req.body.description,
        description: req.body.description,
        category: req.body.category,
        city: req.body.city,
        address: req.body.address,
        startsAt: req.body.startsAt,
        endsAt: req.body.endsAt,
        expectedAttendance: req.body.expectedAttendance,
        status: req.body.status
    }
    
    Event.findByIdAndUpdate(req.params._id, { $set: event }, (err, data) => {
        if(err) {
            throw err
        } else {
            res.status(200).json({
                success: true,
                message: 'Event successfully updated'
            });
        }
    });
}

module.exports.deleteEvent = (req, res) => {
	Event.findByIdAndRemove(req.params._id, (err, data) => {
        if(err) {
            throw err;
        } else {
            res.status(200).json({
                success: true,
                message: 'Event successfully deleted'
            });
        }
    });
}

module.exports.getFinishedEvents = (req, res) => {
    Event.find({ $or: [
        {'endsAt': {$lt: new Date()}},
        {'status': 'Cancelled'}
    ]}, (err, data) => {
        if(err) {
            throw err;
        } else {
            res.status(200).json(data);
        }
    });
}