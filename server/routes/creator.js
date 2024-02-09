const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/creatorsUser");
var jwt = require('jsonwebtoken');
const {query, validationResult, body} = require('express-validator');

const router = express.Router();

router.post('/signup', [
    body('username', 'Enter a valid username').isLength({min: 2}).matches(/^[a-z0-9.,'!&]+$/),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Length of password should be more than 8').isLength({min: 8})
],async(req, res)=>{
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array(), success});
    }
    try {
        const {email, firstname, lastname, username, password} = req.body;;
        console.log(email, firstname, lastname, username, password);
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: securePassword
        })
        success = true;
        res.send(success);
    } catch (error) {
        console.error(err);
        res.status(500).json({"err": "some eror occured"});
    }
});

module.exports = router;