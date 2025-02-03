const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const userController = {
  getProfile: async (request, response) => {
    try {
      const userID = request.userId;

      const userProfile = await User.findById(userID);

      response.status(200).json(userProfile);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updateProfile: async (request, response) => {
    try {
      const userID = request.userId;

      const { name, email } = request.body;

      const updatedProfile = await User.findByIdAndUpdate(
        userID,
        { name, email },
        { new: true }
      );

      response
        .status(200)
        .json({ message: "profile updated successfully", updatedProfile });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteProfile: async (request, response) => {
    try {
      const userID = request.userId;

      await User.findByIdAndDelete(userID);

      response.status(200).json({ message: "profile deleted successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  Register: async (request, response) => {
    try {
      const eventId = request.params.eventId;
      //get the userid from the request object
      const userId = request.userId;
      console.log(userId);

      //check the job in the job model
      const event = await Event.findById(eventId);

      if (!event) {
        return response.status(404).json({ message: "Event not found" });
      }

      // check if the user has already applied for the job
      if (event.attendees.includes(userId)) {
        return response
          .status(401)
          .json({ message: "you have already registered" });
      }

      //if not push the user to the applicants array in the job field
      event.attendees.push(userId);

      //then save the job
      await event.save();

      //lastly return a successfull response
      response.status(200).json({
        message:
          "Registered  for the event successfully, You can book Your Ticket now...",
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  myApplication: async (request, response) => {
    try {
      const userId = request.userId;

      const events = await Event.find({ attendees: userId }).select(
        "-attendees -__v"
      );

      response.status(200).json(events);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getEvents: async (request, response) => {
    try {
      const events = await Event.find().select("-attendees -__v");

      response.status(200).json(events);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  getEventById: async (request, response) => {
    try {
      const eventId = request.params.eventId;

      const event = await Event.findById(eventId).select("-attendees -__v");

      if (!event) {
        return response.status(404).json({ message: "event not found" });
      }

      response.status(200).json(event);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  // Backend controller: Fetch tickets for the user
  myTickets: async (request, response) => {
    try {
      const { userId } = request.params; // Extract userId from route params
      console.log("Requesting tickets for userId:", userId); // Debugging log

      if (!userId) {
        return response.status(400).json({ message: "User ID is required" });
      }

      const tickets = await Ticket.find({ userId }).populate("eventId"); // Fetch tickets for the user
      response.status(200).json(tickets); // Return tickets as a JSON response
    } catch (error) {
      console.error("Error fetching tickets:", error);
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
