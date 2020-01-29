const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

// Login endpoint za autentifikaciju korisnika
// Delegiramo logiku odgovarajucoj metodi korisnickog kontrolera (login)
router.post('/login', userController.login);

// Register endpoint za registraciju korisnika
// Delegiramo logiku odgovarajucoj metodi korisnickog kontrolera (register)
router.post('/register', userController.register);

// Vracamo profil korisnika nadjenog po ID-ju
router.get('/:id', passport.authenticate('jwt', {session:false}), userController.getUserById);

// Azuriramo informacije o korisniku
router.put('/:id', passport.authenticate('jwt', {session:false}), userController.updateUserById);

// Vracamo sve korisnike
router.get('/', passport.authenticate('jwt', {session:false}), userController.getUsers);

// Vracamo sve dogadjaje kojima se korisnik pridruzio
router.get('/joined-events', passport.authenticate('jwt', {session:false}), userController.getJoinedEvents);

router.get('/event/:eventId', userController.getUsersForEvent);

module.exports = router;