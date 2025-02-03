const Company = require("../models/Company");
const Event = require("../models/Event");

const organiserController = {
  createEvent: async (request, response) => {
    try {
      // Destructure the request body
      const { title, description, location, date, imageUrl, ticketPrices } =
        request.body;

      // Validate required fields
      if (
        !title ||
        !description ||
        !location ||
        !date ||
        !imageUrl ||
        !ticketPrices
      ) {
        return response
          .status(400)
          .json({ message: "Missing required fields" });
      }

      // Find the company based on userId
      const company = await Company.findOne({ organiser: request.userId });
      if (!company) {
        return response.status(404).json({ message: "Company not found" });
      }

      // Create the new event
      const newEvent = new Event({
        title,
        description,
        location,
        date,
        imageUrl,
        postedBy: request.userId,
        company: company._id,
        ticketPrices,
      });

      // Save the event
      await newEvent.save();

      // Respond with success and event details
      response
        .status(201)
        .json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
      // Handle errors
      response.status(500).json({ message: error.message });
    }
  },

  viewEvents: async (request, response) => {
    try {
      const userId = request.userId;
      console.log(userId);
      const events = await Event.find({ postedBy: userId });

      response.status(200).json(events);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteEvent: async (request, response) => {
    try {
      const eventId = request.params.eventId;

      // Find the event to be deleted
      const event = await Event.findById(eventId);
      if (!event) {
        return response.status(404).json({ message: "Event not found" });
      }

      // Delete the event
      await Event.findByIdAndDelete(eventId);

      response.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updateEvent: async (request, response) => {
    try {
      const eventId = request.params.eventId;
      const { title, description, location, date, ticketPrices } = request.body;

      const event = await Event.findById(eventId);
      console.log(eventId);

      if (!event) {
        return response.status(404).json({ message: "Event not found" });
      }
      event.title = title;
      event.description = description;
      event.location = location;
      event.date = date;
      event.ticketPrices = ticketPrices;

      await event.save();
      response.status(200).json({ message: "Event updated successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  viewAttendeeProfile: async (request, response) => {
    try {
      const eventId = request.params.eventId;
      const userId = request.params.userId;

      const event = await Event.findById(eventId);

      if (!event) {
        return response.status(404).json({ message: "Event not found" });
      }

      await event.populate("attendees", "-password -__v");

      response.status(200).json(event.attendees);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  viewApplications: async (request, response) => {
    try {
      const attendees = await Event.find({
        postedBy: request.userId,
      }).populate("attendees", "-password -__v");
      response.status(200).json(attendees);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = organiserController;
