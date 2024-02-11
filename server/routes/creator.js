const express = require("express");
const bcrypt = require('bcrypt');
const UserCreator = require("../models/creatorsUser");
const workSpace = require("../models/workspace");
const UserEditor = require("../models/editorUser");
const Task = require('../models/task');
var jwt = require('jsonwebtoken');
const {query, validationResult, body, oneOf} = require('express-validator');
const getUser = require('../middleware/getuser');
const router = express.Router();
const JWT_SECRET = "secrettosign";

const getIdByUsername = async(request, model, finalArray)=>{
    for(var _ of request){
        var user = await model.findOne({username: _});
        var userId = user.id;
        finalArray.push(userId); 
    }
    return finalArray;
}

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
        res.status(500).json({success, "err": "some eror occured"});
    }

})

router.post('/createworkspace',  getUser, [
    body('name', 'Enter a valid Workspace name').isLength({min: 2}),
], async(req, res)=>{
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({error: errors.array(), success});
    }

    const creator = await UserCreator.findOne({_id: req.id});
    if(!creator){
        return res.send({"error": "Inapropiate Request", success});
    }

    try {
        const membersId = [req.id];
        const workspace = await workSpace.create({
            name: req.body.name,
            description: req.body.description,
            members: await getIdByUsername(req.body.members, UserEditor, membersId),
            ownerId: req.id
        });
        success = true;
        res.json(workspace);
    } catch (error) {
        console.log(error);
        res.status(500).json({success ,"err": "some eror occured"});
    }

})

router.put('/updateworkspace/:id', getUser, [
    body('name', 'Enter a valid Workspace name').isLength({min: 2}),
], async(req, res)=>{
    let success = false;
    var workspace = await workSpace.findById(req.params.id);
    if(!workspace){return res.send({"error": "No such workspace found", success});}
    const ownerId = workspace.ownerId.toString();
    if(ownerId!=req.id){
        return res.send({"error": "Inapropiate Request", success});
    }
    try {
        const membersId = [req.id];
        const {name, description, members} = req.body;
        
        const newWorkSpace =  {};
        if(name){newWorkSpace.name = name};
        if(description){newWorkSpace.description = description};
        if(members){
            newWorkSpace.members = await getIdByUsername(members, UserEditor, membersId);
        }

        workspace = await workSpace.findByIdAndUpdate(req.params.id, {$set: newWorkSpace}, {new: true});
        success = true;
        res.json(workspace);

    } catch (error) {
        console.log(error);
        res.status(500).json({success ,"err": "some eror occured"});
    }
})

router.delete('/deleteworkspace/:id', getUser, async(req, res)=>{
    let success = false;
    var workspace = await workSpace.findById(req.params.id);
    if(!workspace){return res.send({"error": "No such workspace found", success});}
    const ownerId = workspace.ownerId.toString();
    if(ownerId!=req.id){
        return res.send({"error": "Inapropiate Request", success});
    }

    try {
        workspace = await workSpace.findByIdAndDelete({_id: req.params.id});
        res.json({"Success": "workspace deleted succesfully", workspace});
    } catch (error) {
        console.log(error);
        res.status(500).json({success ,"err": "some eror occured"});
    }
})

router.post('/createtask/:workspaceid', getUser, [
    body('name', 'Enter a valid Workspace name').isLength({min: 2}),
], async(req, res)=>{
    let success = false;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({error: errors.array(), success});
    }

    const creator = await UserCreator.findById(req.id);
    if(!creator){return res.send({"error": "Invalid Request", success})};
    const workspace = await workSpace.findById(req.params.workspaceid);
    if(workspace.ownerId.toString()!=req.id){return res.send({"error": "Invalid Request. Workspace auth denied", success})};

    try {
        var videoEditors = [req.id];
        var captionWriters = [req.id];
        var thumbnailEditors = [req.id];
        var tdtWriters = [req.id];

        const task = await Task.create({
            workspceId: req.params.workspaceid,
            ownerId: req.id,
            name: req.body.name,
            description: req.body.description,
            videoLink: req.body.videolink,
            videoEditors: await getIdByUsername(req.body.videoeditors, UserEditor, videoEditors),
            captionWriters:await getIdByUsername(req.body.captionwriters, UserEditor, captionWriters),
            thumbnailEditors: await getIdByUsername(req.body.thumbnaileditors, UserEditor, thumbnailEditors),
            tdtWriters: await getIdByUsername(req.body.tdtwriters, UserEditor, tdtWriters),
        })

        success = true;
        res.json({"messege": "task added succesfully", task});
    } catch (error) {
        console.log(error);
        res.status(500).json({success ,"err": "some eror occured"});
    }
})

module.exports = router;