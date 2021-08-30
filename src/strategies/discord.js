require('./../database/schemas/userSchema');

const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const mongoose = require('mongoose');
const user = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.uid)
});

passport.deserializeUser(async (discordID, done) => {
    try {
        const getUser = await user.findOne({ uid: discordID });
        return getUser ? done(null, getUser) : done(null, null);
    } catch (err) {
        console.log(err)
        done(err, null)
    }
});

passport.use(
    new DiscordStrategy({
        clientID: process.env.DASHBOARD_CLIENT_ID,
        clientSecret: process.env.DASHBOARD_CLIENT_SECRET,
        callbackURL: process.env.DASHBOARD_CALLBACK_URL,
        scope: ['identify', 'guilds']
    }, async (accessToken, refreshToken, profile, done) => {
        const { id, username, discriminator, avatar, guilds } = profile;
        console.log(id, username, discriminator, avatar);

        try {
            const getUser = await user.findOne({ uid: id })

            if (getUser) {
                getUser.guilds = guilds;
                await getUser.save()
                console.log('User found.')
                return done(null, getUser)
            } else {
                const newUser = await new user({ uid: id, guilds: guilds }).save()
                return done(null, newUser)
            }
        } catch (err) {
            console.log(err)
            return done(err, null)
        }
    })
);