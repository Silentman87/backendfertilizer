import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Fertilizer from "../models/Fertilizer.js";

// ✅ Add Fertilizer
export const addFertilizer = async (req, res) => {
  try {
    const { name, price, expiryDate, weight, currentStock, batchNo, type } = req.body;

    // check if batch already exists
    const existingFertilizer = await Fertilizer.findOne({ batchNo });
    if (existingFertilizer) {
      return res.status(400).json({ error: "Fertilizer with this batch number already exists" });
    }

    // create new fertilizer
    const fertilizer = await Fertilizer.create({
      name,
      price,
      expiryDate,
      weight,
      currentStock,
      batchNo,
      type,
    });

    res.status(201).json({
      message: "Fertilizer added successfully",
      fertilizer,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Get All Fertilizers
export const getFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find();
    res.status(200).json(fertilizers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Fertilizer
export const updateFertilizer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFertilizer = await Fertilizer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFertilizer) {
      return res.status(404).json({ error: "Fertilizer not found" });
    }

    res.status(200).json({
      message: "Fertilizer updated successfully",
      updatedFertilizer,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete Fertilizer
export const deleteFertilizer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFertilizer = await Fertilizer.findByIdAndDelete(id);

    if (!deletedFertilizer) {
      return res.status(404).json({ error: "Fertilizer not found" });
    }

    res.status(200).json({ message: "Fertilizer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
