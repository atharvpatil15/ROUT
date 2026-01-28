const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/users/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Check if user exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // 2. Check if user exists with same email (link account)
        user = await User.findOne({ email: profile.emails[0].value });
        
        if (user) {
          user.googleId = profile.id;
          if (!user.avatar || user.avatar === 'default.jpg') {
             user.avatar = profile.photos[0].value;
          }
          await user.save({ validateBeforeSave: false });
          return done(null, user);
        }

        // 3. Create new user
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value,
        });

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
