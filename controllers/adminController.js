const User = require("../models/User");
const bcrypt = require("bcrypt");
const Event = require("../models/Event");
const Company = require("../models/Company");
const Ticket = require("../models/Ticket");

const adminController = {
  //oragniser apis
  // In your backend controller (createOrganiser function)
  createOrganiser: async (request, response) => {
    try {
      const { name, email, password, role } = request.body;

      // Check if the organiser already exists
      const organiser = await User.findOne({ email });
      if (organiser) {
        return response
          .status(400)
          .json({ message: "Organiser already exists" });
      }

      // Hash the password
      const hashedPass = await bcrypt.hash(password, 10);

      // Create a new organiser
      const newOrganiser = new User({
        name,
        email,
        password: hashedPass,
        role,
      });

      // Save the organiser
      await newOrganiser.save();

      // Send a success response
      response.status(201).json({ message: "Organiser created successfully" });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ message: "Failed to create organiser", error: error.message });
    }
  },

  updateOrganiser: async (request, response) => {
    try {
      const { name, email, password } = request.body;

      // get the id of the recruiter
      const { id } = request.params;

      const organiser = await User.findById(id);

      if (!organiser) {
        return response.json({ message: "organiser not found" });
      }

      await User.findByIdAndUpdate(id, {
        name,
        email,
        password,
      });

      response
        .status(200)
        .json({ message: "organiser updated successfully..." });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteOrganiser: async (request, response) => {
    try {
      const { id } = request.params;

      const organiser = await User.findById(id);

      if (!organiser) {
        response.json({ message: "organiser not found" });
      }

      await User.findByIdAndDelete(id);

      response.json({ message: "organiser deleted successfully.." });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  assignOrganiser: async (request, response) => {
    try {
      const { eventId, organiserId } = request.params;

      const event = await Event.findById(eventId);

      if (!event) {
        return response.json({ message: "event not found...." });
      }

      const organiser = await User.findById(organiserId);

      if (!organiser) {
        return response.json({ message: "organiser not found...." });
      }

      await Event.findByIdAndUpdate(eventId, {
        organiser: organiserId,
      });

      response
        .status(200)
        .json({ message: "organiser assigned successfully..." });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  unassignOrganiser: async (request, response) => {
    try {
      const { eventId, organiserId } = request.params;

      const event = await Event.findById(eventId);

      if (!event) {
        return response.json({ message: "event not found...." });
      }

      const organiser = await User.findById(organiserId);

      if (!organiser) {
        return response.json({ message: "organiser not found...." });
      }

      await Event.findByIdAndUpdate(eventId, {
        organiser: null,
      });

      response.status(200).json({ message: "organiser unassigned..." });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  viewEvents: async (request, response) => {
    try {
      const events = await Event.find()
        .populate("postedBy", "name email") // Populate organizer details
        .select("-password -__v"); // Exclude unnecessary fields

      response.status(200).json(events);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  viewAllTickets: async(request, response) =>{
    try{
      const tickets = await Ticket.find().populate("userId eventId");
      response.status(200).json(tickets);

    }catch(error){
      response.status(500).json({ message: error.message });
    }
  },
  viewAllUser: async (request, response) => {
    try {
      const user = await User.find();
      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  updateUser: async (request, response) => {
    try {
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteUser: async (request, response) => {
    try {
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  //company api's
  createCompany: async (request, response) => {
    try {
      const { name, location } = request.body;

      console.log("Received request body:", request.body);

      // Check for missing fields
      if (!name || !location) {
        console.log("Validation failed: Missing name or location");
        return response
          .status(400)
          .json({ message: "Name and location are required" });
      }

      // Check if the company already exists
      const company = await Company.findOne({ name });
      if (company) {
        console.log("Company already exists:", company);
        return response.status(409).json({ message: "Company already exists" });
      }

      // Create and save the new company
      const newCompany = new Company({
        name,
        location,
      });

      await newCompany.save();

      console.log("Company created successfully:", newCompany);
      return response
        .status(201)
        .json({ message: "Company created successfully", data: newCompany });
    } catch (error) {
      console.error("Error in createCompany:", error.message);
      return response
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  updateCompany: async (request, response) => {
    try {
      const { name, location } = request.body;

      const { id } = request.params;

      const company = await Company.findById(id);

      if (!company) {
        return response.json({ message: "company not found..." });
      }

      await Company.findByIdAndUpdate(id, {
        name,
        location,
      });

      response.satus(200).json({ message: "company updated successfully..." });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  deleteCompany: async (request, response) => {
    try {
      const { id } = request.params;

      const company = await Company.findByIdAndDelete(id);

      if (!company) {
        return response.json({ message: "company not found" });
      }

      response.status(200).json({ message: "company deleted successfully..." });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

module.exports = adminController;
