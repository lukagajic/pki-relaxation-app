const express = require('express');
const router = express.Router();
const passport = require('passport');

const eventController = require('../controllers/eventController');

// Ruta za dobijanje liste svih dogadjaja
router.get('/', eventController.getAllEvents);

// Ruta za dodavanje novog dogadjaja
router.post('/', passport.authenticate('jwt', {session:false}), eventController.addEvent);

// Ruta za brisanje dogadjaja
router.delete('/:_id', passport.authenticate('jwt', {session: false}), eventController.deleteEvent);

// Ruta za dobijanje svih zavrsenih dogadjaja
router.get('/finished', passport.authenticate('jwt', {session: false}), eventController.getFinishedEvents);


// Ruta za azuriranje postojeceg dogadjaja
router.put('/:_id', passport.authenticate('jwt', {session: false}), eventController.updateEvent);

// Ruta za ocenjivanje postojeceg dogadjaja
router.put('/:_id/rate', passport.authenticate('jwt', {session: false}), eventController.rateEvent);

router.get('/finished', eventController.getFinishedEvents);

module.exports = router;