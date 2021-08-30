const router = require('express').Router();
const passport = require('passport');

router.get('/discord', passport.authenticate('discord') );

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('http://ussapi.ga/home')
})

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
})

module.exports = router;