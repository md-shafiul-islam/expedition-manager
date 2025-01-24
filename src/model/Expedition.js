const mongoose = require("mongoose");

const expeditionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 0,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"], // Restricts difficulty levels
    },
    guide: {
      type: String,
      required: true,
      trim: true,
    },
    itinerary: {
      type: [String], // Array of strings
      required: true,
      validate: {
        validator: (value) => value.length > 0, // Ensure at least one item exists
        message: "Itinerary must contain at least one entry.",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Expedition =
  mongoose.Expedition || mongoose.model("Expedition", expeditionSchema);
module.exports = Expedition;
