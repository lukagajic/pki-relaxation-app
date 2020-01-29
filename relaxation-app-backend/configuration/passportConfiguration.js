const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const databaseOptions = require('../configuration/databaseConfiguration');

function generateAndReturnToken(passport) {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');;
    options.secretOrKey = databaseOptions.secret;
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        console.log(jwt_payload);
        
        User.findOne({ _id: jwt_payload.id }, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if(!user) {
                return done(null, false);
            }
            return done(null, user);
        });
    }));
}

module.exports = generateAndReturnToken;