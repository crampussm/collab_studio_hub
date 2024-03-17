const express = require("express");
const bcrypt = require('bcrypt');
const UserEditor = require("../models/editorUser");
const Task = require('../models/task');
const getUser = require('../middleware/getuser');
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
        const {email, firstname, lastname, username, password} = req.body;

        let creatorbyusername = await UserEditor.findOne({username: username});
        if(creatorbyusername){return res.status(400).send({error: [{msg: "User must be unique"}], success});}

        let creatorbyemail = await UserEditor.findOne({email: email});
        if(creatorbyemail){return res.status(400).send({error: [{msg: "Email already exists"}], success});}

        console.log(email, firstname, lastname, username, password);
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);
        const user = await UserEditor.create({
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
        res.send({authToken ,success, type:'editor'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success, error: [{msg: "some error occured"}]});
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
        let user = await UserEditor.findOne({email: usernameOrEmail});
        if (!user) {
            user = await UserEditor.findOne({username: usernameOrEmail});
        }

        if (!user) {
            return res.status(400).send({error: [{msg: "Wrong email or username"}], success});
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).send({error: [{msg: "Wrong password"}], success});
        }

        success = true;
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken, success, type:'editor'});
    } catch (error) {
        console.log(error);
        res.status(500).json({success, error: [{msg: "some error occured"}]});
    }

})

router.put('/updatetask/:taskid', getUser, async(req, res)=>{
    let success = false;

    var task = await Task.findById(req.params.taskid);
    if(!task){return res.send({"error": "No such task found", success});}
    const editor = await UserEditor.findById(req.id);
    if(!editor){return res.send({"error": "Inapropiate Request", success});}

    try {
        const {editedvideolink, writtencaption, editedthumbnail, writtentdt} = req.body;

        const isVideoEditor = task.videoEditors.includes(req.id);
        const isCaptionWriter = task.captionWriters.includes(req.id);
        const isThumbnailEditor = task.thumbnailEditors.includes(req.id);
        const isTdtWriter = task.tdtWriters.includes(req.id);

        const newTask =  {};
        if(editedvideolink && isVideoEditor){newTask.editedVideoLink = editedvideolink};
        if(writtencaption && isCaptionWriter){newTask.writtenCaption = writtencaption};
        if(editedthumbnail && isThumbnailEditor){newTask.editedThumbnail = editedthumbnail};
        if(writtentdt && isTdtWriter){newTask.writtenTdt = writtentdt};

        newTask = await Task.findByIdAndUpdate(req.params.taskid, {$set: newTask}, {new: true});
        success = true;
        res.json(task);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success ,"err": "some eror occured"});
    }
})

module.exports = router;