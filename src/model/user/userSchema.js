const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
      },
      company: {
        type: String,
        maxlength: 50,
        required: true,
      },
      address: {
        type: String,
        maxlength: 100,
      },
      phone: {
        type: Number,
        maxlength: 11,
      },
      email: {
        type: String,
        maxlength: 50,
        required: true,
      },
      password: {
        type: String,
        minlength: 8,
        maxlength: 100,
        required: true,
      },
      refreshToken: {
        token: {
          type: String,
          maxlength: 500,
          default: "",
        },
      addedAt: {
        type: Date,
        required: true,
        default: Date.now(),
        }
      }
})

// We canot directly export userSchema here, we can usie it by creating a model out of here
module.exports = {
    userSchema: mongoose.model("User", userSchema)
}