const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    expedition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expedition", // References the Expedition model
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      min: [1, "A booking must include at least one seat."],
      validate: {
        validator: async function (value) {
          const expedition = await mongoose
            .model("Expedition")
            .findById(this.expedition);
          if (!expedition) return false; // Invalid expedition reference
          return expedition.availableSeats >= value; // Check seat availability
        },
        message: "Not enough available seats for this booking.",
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price must be non-negative."],
      validate: {
        validator: function (value) {
          return value === this.seats * this.pricePerSeat; // Enforce total price consistency
        },
        message: "Total price must be equal to seats × price per seat.",
      },
    },
    pricePerSeat: {
      type: Number,
      required: true,
      min: [0, "Price per seat must be non-negative."],
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"], // Booking statuses
      default: "Pending",
    },
    bookingDate: {
      type: Date,
      default: Date.now, // Automatically set booking date
    },
    paymetStatus: {
      type: String,
      enum: ["Success", "Failed", "Pending"], // Payment statuses
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

//
// Hooks (Middlewares) for Business Logic
//

// Post-save middleware: Adjust available seats after a confirmed booking
bookingSchema.post("save", async function () {
  const Expedition = mongoose.model("Expedition");

  if (this.status === "Confirmed") {
    const expedition = await Expedition.findById(this.expeditionId);
    if (expedition) {
      expedition.availableSeats -= this.seats; // Deduct booked seats
      await expedition.save();
    }
  }
});

// Pre-save middleware: Restore seats on booking cancellation
bookingSchema.pre("save", async function (next) {
  if (this.isModified("status") && this.status === "Cancelled") {
    const Expedition = mongoose.model("Expedition");
    const expedition = await Expedition.findById(this.expeditionId);

    if (expedition) {
      expedition.availableSeats += this.seats; // Restore seats
      await expedition.save();
    }
  }

  next();
});

//
// Static and Instance Methods
//

// Static method to create a new booking
bookingSchema.statics.createBooking = async function (data) {
  const Expedition = mongoose.model("Expedition");
  const expedition = await Expedition.findById(data.expeditionId);

  if (!expedition) {
    throw new Error("Expedition not found.");
  }

  if (expedition.availableSeats < data.seats) {
    throw new Error("Not enough seats available.");
  }

  const booking = new this({
    ...data,
    pricePerSeat: expedition.price,
    totalPrice: data.seats * expedition.price,
  });

  return booking.save();
};

// Instance method to update booking status
bookingSchema.methods.updateStatus = async function (newStatus) {
  if (newStatus === "Cancelled" && this.status === "Confirmed") {
    const Expedition = mongoose.model("Expedition");
    const expedition = await Expedition.findById(this.expeditionId);

    if (expedition) {
      expedition.availableSeats += this.seats; // Restore seats
      await expedition.save();
    }
  }

  this.status = newStatus;
  return this.save();
};

module.exports = mongoose.model("Booking", bookingSchema);
