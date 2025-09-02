import mongoose from 'mongoose';

const fertilizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  expiryDate: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,   // in kg or g (decide unit in your system)
    required: true,
    min: 0
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0
  },
  batchNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String, // e.g. Urea, DAP, NPK, Organic, etc.
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });  // adds createdAt, updatedAt automatically

export default mongoose.model('Fertilizer', fertilizerSchema);
