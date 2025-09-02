import mongoose from "mongoose";
import dotenv  from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import Farmer  from "../models/Farmer.js";
import generatetoken from "../utils/generatetoken.js";


export const signup = async (req, res) => {
  try {
    const { username, mobile, society, village, address, aadhar_card, kishan_card } = req.body;

    // check if mobile or aadhar already exists (to avoid duplicates)
    const existingFarmer = await Farmer.findOne({ mobile });
    if (existingFarmer) {
      return res.status(400).json({ error: "Farmer with this mobile already exists" });
    }

    // create new farmer
    const farmer = await Farmer.create({
      username,
      mobile,
      society,
      village,
      address,
      aadhar_card,
      kishan_card,
    });

    // respond with success (optionally token)
    res.status(201).json({
      message: "Farmer registered successfully",     
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const signin = async(req,res) => {
   try {
     const { username,mobile,society,village } = req.body;
      // check if farmer exists
    const farmer = await Farmer.findOne({ mobile });
    if (!farmer) {
      return res.status(400).json({ error: "Farmer not found, please register first" });
    }

    // verify aadhar_card (or any other unique field you prefer)
    if (farmer.society !== society) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate token
    const token = generatetoken(farmer._id);
    res.status(200).json({
      message: "Signin successful",
      farmer,
      token,
    });
    
    }
    catch (error) {
     res.status(400).json({error: error.message});
   }
};
