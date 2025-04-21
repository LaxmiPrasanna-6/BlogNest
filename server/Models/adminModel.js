const mongoose = require("mongoose");
const { Schema } = require("mongoose");
require("dotenv").config();

const adminSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return v === process.env.ADMIN_EMAIL;
        },
        message: "Invalid admin",
      },
    },
    profileImageUrl: {
      type: String,
    },
  },
  { strict: true }
);

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;