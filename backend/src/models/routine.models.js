import mongoose from "mongoose";
const routineSchema = new mongoose.Schema({});
export const Routine = mongoose.model("Routine", routineSchema);