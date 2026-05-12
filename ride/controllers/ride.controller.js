import Ride from "../models/ride.model.js";

export const ride = async (req, res) => {
  try {
    const { pickup, destination } = req.body;

    // validation
    if (!pickup || !destination) {
      return res.status(400).json({
        message: "Pickup and destination are required",
      });
    }

    const newRide = await Ride.create({
      user: req.user._id,
      pickup,
      destination,
    });

    return res.status(201).json(newRide);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};