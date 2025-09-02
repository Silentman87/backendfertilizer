import Activity from "../models/Activity.js";
import Farmer from "../models/Farmer.js";
import Fertilizer from "../models/Fertilizer.js";

// ==========================
// FARMER SIDE
// ==========================

// Farmer creates new proposal/request
export const createActivity = async (req, res) => {
  try {
    const { fertilizerId, quantity } = req.body;
      
    // check farmer
    const farmer =  await Farmer.findById(req.farmerId);
    if(!farmer) return res.status(404).json({error : "farmer not found"});

    // check fertilizer
    const fertilizer = await Fertilizer.findById(fertilizerId);
    if (!fertilizer) return res.status(404).json({ error: "Fertilizer not found" });

    // check stock availability (optional)
    if (fertilizer.currentStock < quantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    const activity = await Activity.create({
       farmer: req.farmerId, 
      fertilizer: fertilizerId,
      quantity,
    });

    res.status(201).json({
      message: "Request submitted successfully",
      activityId,
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Farmer fetches his proposals
export const getFarmerActivities = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const activities = await Activity.find({ farmer: farmerId })
      .populate("fertilizer", "name price type")

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==========================
// ADMIN SIDE
// ==========================

// Admin fetches all proposals
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("fertilizer", "name price type" )
      .populate("farmer", "username  mobile society village");

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin approves or rejects

export const updateActivityStatus = async (req, res) => {
  try {
    const { activityId } = req.params;
    const { status, adminRemark } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    activity.status = status;
    if (adminRemark) activity.adminRemark = adminRemark;

    if (status === "approved") {
      const fertilizer = await Fertilizer.findById(activity.fertilizer);
      if (fertilizer.currentStock < activity.quantity) {
        return res.status(400).json({ error: "Not enough stock to approve" });
      }
      fertilizer.currentStock -= activity.quantity;
      await fertilizer.save();
    }

    await activity.save();

    res.status(200).json({
      message: `Activity ${status} successfully`,
      activity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
