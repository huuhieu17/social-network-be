const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: Boolean,
    },
    birthday: {
        type: String,
    },
    avatar: {
        type: String,
    },
    cover: {
        type: String,
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

// Mã hoá password trước khi lưu
accountSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

const Account = mongoose.model("Account", accountSchema);

module.exports = Account