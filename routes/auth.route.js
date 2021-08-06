const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const brcypt = require('bcryptjs')
const {checkSchema, validationResult} = require('express-validator');
const gravatar = require('gravatar')

const User = require('../models/User')

router.post('/register', [
    //check('name', 'NAME IS REQUIRED!').not().isEmpty(),
    //check('email', 'INSERT A VALID EMAIL ADDRESS!').isEmail(),
    //check('password', 'PASSWORD MUST BE 6 OR MORE CHARACTERS!').isLength({
    //    min: 6
    //})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'USER IS ALREADY USED!'
                    },
                ],
            });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name, email, avatar, password
        })

        const salt = await brcypt.genSalt(10);
        user.password = await brcypt.hash(password, salt)
        await user.save();

        const payload ={
            user: {
                id: user.id
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        );
    } catch (error) {
        console.log(err.message)
        res.status(500).send('SERVER ERROR!')
    }
  }
);

module.exports = router