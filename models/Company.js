const mongoose = require("mongoose");

const companySchema = {
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  organiser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
};

module.exports = mongoose.model("Company", companySchema, "details");
