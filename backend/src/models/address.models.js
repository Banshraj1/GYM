import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    trim: true,
    required: true,
  },
  locality: {
    type: String,
    trim: true,
    required: true,
  },
  houseNumber: {
    type: String,
    trim: true,
  },
});

export const Address = mongoose.model("Address", addressSchema);