const { Schema, default: mongoose } = require("mongoose");

const accountSchema = new Schema(
  {
    username: String,
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    phone: {
      type: String,
      required: false,
      match: [/^\d{10}$/, "is invalid"], // assuming a 10-digit phone number
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account