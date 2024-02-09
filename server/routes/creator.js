const express = require("express");
const bcrypt = require('bcrypt');
const UserCreator = require("../models/creatorsUser");
var jwt = require('jsonwebtoken');
const {query, validationResult, body, oneOf} = require('express-validator');

const router = express.Router();
const JWT_SECRET = "secrettosign";

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
        const user = await UserCreator.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: securePassword
        })
        success = true;
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.send({authToken ,success});
    } catch (error) {
        console.error(error);
        res.status(500).json({"err": "some eror occured"});
    }
});

router.post('/login', [
    oneOf([
        body('usernameOrEmail', 'Enter a valid username').isLength({min: 2}).matches(/^[a-z0-9.,'!&]+$/),
        body('usernameOrEmail', 'Enter a valid email').isEmail(),
    ]),
    body('password', 'Length of password should be more than 8').isLength({min: 8})
], async(req, res)=>{
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({error: errors.array(), success});
    }

    try {
        const {usernameOrEmail, password} = req.body;
        console.log(usernameOrEmail, password);
        let user = await UserCreator.findOne({email: usernameOrEmail});
        if (!user) {
            user = await UserCreator.findOne({username: usernameOrEmail});
        }

        if (!user) {
            return res.status(400).send({error: "Wrong email or username", success});
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).send({error: "Wrong password", success});
        }

        success = true;
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken, success})
    } catch (error) {
        console.log(error);
        res.status(500).json({"err": "some eror occured"});
    }

})

module.exports = router;