const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const databaseOptions = require('../configuration/databaseConfiguration');

// Middleware za registraciju korisnika
module.exports.register = (req, res) => {
	bcrypt.hash(req.body.password, 10).then((hash) => {
		const user = new User({
			forename: req.body.forename,
			surname: req.body.surname,
			email: req.body.email,
			password: hash,
			city: req.body.city,
			address: req.body.address,
			bornAt: req.body.bornAt,
			role: req.body.role,
			interests: req.body.interests,
			joinedEvents: req.body.joinedEvents
		});
		
		user.save().then((response) => {
			res.status(201).json({
				success: true,
				message: "Successful registration"
			});
		}).catch(err => {
			res.status(500).json({
				success: false,
				error: err
			});
		});
			
	});
}

// Middleware za proveru validnosti korisnika i vracanje tokena
module.exports.login = (req, res) => {
	let user;
	User.findOne({
		email: req.body.email
	}).then(u => {
		if(!u) {
			return res.status(401).json({
				success: false,
				message: "Authentication failed"
			});
		}
		user = u;
		return bcrypt.compare(req.body.password, user.password);
	}).then(response => {
		if(!response) {
			return res.status(401).json({
				success: false,
				message: "Authentication failed"
			});
		}
		let jsonWebToken = jwt.sign({
			email: user.email,
			id: user._id
		}, databaseOptions.secret, {
			expiresIn: 604800
		});
		res.status(200).json({
			success: true,
			message: 'Authenticaton successful',
			token: "JWT " + jsonWebToken,
			expiresIn: 604800,
			user: {
				id: user._id,
				forename: user.forename,
				surname: user.surname,
				email: user.email,
				city: user.city,
				address: user.address,
				bornAt: user.bornAt,
				role: user.role,
				interests: user.interests,
				joinedEvents: user.joinedEvents
			}
		});
	});
}

// Middleware za vracanje korisnika po ID-ju
module.exports.getUserById = (req, res) => {
	User.findById(req.params.id, (err, data) => {
		if (err) {
			res.json({
				success: false,
				message: "User not found"
			});
		} else {
			res.json(data);
		}
	}).populate('joinedEvents');
}

module.exports.updateUserById = (req, res) => {
	User.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
		if(err) {
			throw err;
		} else {
			res.json(data);
		}
	});
}

module.exports.getUsers = (req, res) => {
	User.find({}, (err, data) => {
		if(err) {
			throw(err);
		} else {
			res.json(data);
		}
	});
}

module.exports.getJoinedEvents = (req, res) => {
	const query = User.findById(req.params.id);

	query.select('joinedEvents');

	query.exec((err, user) => {
		if(err) {
			throw err;
		} else {
			res.json(user.joinedEvents);
		}
	});
}

module.exports.getUsersForEvent = (req,res) => {
	const eventId = req.params.eventId;
	User.find({joinedEvents: { "$in": [eventId]}}, (err, data) => {
		if(err) {
			throw err;
		} else {
			res.status(200).json(data);
		}
	}).populate('joinedEvents');
}