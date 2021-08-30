require('./../database/schemas/userSchema');
require('./../database/schemas/businessSchema');
require('./../database/schemas/botSchema');

const router = require('express').Router();
const { getBotGuilds } = require('../utils/api');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Business = mongoose.model('Business');
const Bot = mongoose.model('Bot');
const { getMutualGuilds } = require('../utils/utils');

router.get('/businesses', async (req, res) => {
    console.log(req.user)
    const guilds = await getBotGuilds();
    const user = await User.findOne({ uid: req.user.uid });
    
    if (user) {
        const userGuilds = user.guilds;
        const businesses = user.businesses
        const mutualGuilds = getMutualGuilds(userGuilds, guilds)
        res.send(businesses)
    } else {
        return res.status(401).send({ message: 'unauthorized' })
    }
})

router.put('/businesses/:busOwner/:bid/employees', async (req, res) => {
    const { employee } = req.body;
    const { busOwner, bid } = req.params;

    if (!employee) return res.status(400).send({ message: 'UserID for employee is required!' })

    const data = await Business.findOne({ bid: bid });
    
    if (data) {
        console.log(data)
        console.log(data.owner === busOwner)
        if (data.owner !== busOwner) return res.status(400).send({ message: 'Owner given is not owner of business given' })
        if (data.employees.includes(employee)) return res.status(400).send({ message: 'Employee already registered in given business' });
        await data.employees.push(employee)
        await data.save()
        res.status(200).send({ message: 'Employee added' })
    } else if (!data) {
        res.status(400).send({ message: 'Business not found '});
    }
})

router.get('/businesses/:bid/config', async (req, res) => {
    const { bid } = req.params;
    const config = await Business.findOne({ bid: bid });
    return config ? res.send(config) : res.status(404).send({ message: 'Not found' });
})

module.exports = router;