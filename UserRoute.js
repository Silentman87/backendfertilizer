import express, { Router } from 'express';
import {signup , signin} from './routes/farmerroutes.js';
import {addFertilizer,  getFertilizers,updateFertilizer,  deleteFertilizer } from "./routes/fertilizerroute.js";
import {createActivity, getFarmerActivities, getAllActivities, updateActivityStatus } from "./routes/activityroute.js";
import  authMiddleware from './middleware/authmiddleware.js';
const router = express.Router();

// farmer login and signup route 
router.post('/signup', signup);
router.post('/signin', signin);
// farmer part   


// fertilizer route for create , delete , update 
router.post("/addfertilizer", addFertilizer);       // add new fertilizer
router.get("/getfertilizer", getFertilizers);       // get all fertilizers
router.put("/updatefertilizer/:id", updateFertilizer);  // update fertilizer using put all at time 
router.patch("/updatefertilizer/:id", updateFertilizer);  // update fertilizer using patch some doc
router.delete("/deletefertilizer/:id", deleteFertilizer); // delete fertilizer

// proposal route for farmer side and admin side 
// farmer
router.post("/createrequest", authMiddleware , createActivity);
router.get("/getfarmerrequest/:farmerId", getFarmerActivities);

// admin
router.get("/getallrequest", getAllActivities);
router.put("/updaterequest/:activityId", updateActivityStatus);


export default router;  // ✅ Correct
