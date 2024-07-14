const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

module.exports =
  mongoose.models.Session || mongoose.model("Session", SessionSchema);
