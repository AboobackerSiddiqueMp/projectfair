//path to resolve each client request

//import express
const userController=require('../Controllers/userController')
const projectcontrollar=require('../Controllers/projectController')


const express=require("express");
const jwtmiddileware = require('../middileware/jwtMiddileware');
const multerConfig = require('../middileware/multerMiddileware');


//create a obj for class router in express


const router= new express.Router();

router.post('/user/register',userController.register)

router.post('/user/login',userController.login)

router.post('/project/addProject',jwtmiddileware,multerConfig.single('projectimage'),projectcontrollar.addproject)

router.get('/project/getHomeProject',projectcontrollar.getHomeProject)

router.get('/project/getAllproject',jwtmiddileware,projectcontrollar.getAllproject)

router.get('/project/getUserProject',jwtmiddileware,projectcontrollar.getUserProject)

router.put('/project/updateproject/:id',jwtmiddileware,multerConfig.single('projectimage'),projectcontrollar.updateUserProject)

router.delete('/project/deleteProject/:id',jwtmiddileware,projectcontrollar.deleteUserProject)

router.post('/profile/addProject',jwtmiddileware,multerConfig.single('profileImage'),projectcontrollar.addProfile)

router.get('/profile/getuserProfile',jwtmiddileware,projectcontrollar.getUserProfile)


module.exports=router
