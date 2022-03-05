const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetPinSchema = new Schema({
    pin: {
      type: String,
      maxlength: 6,
      minlength: 6,
    },
    email: {
      type: String,
      maxlength: 50,
      required: true,
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    }
})

// We canot directly export userSchema here, we can usie it by creating a model out of here
module.exports = {
  resetPinSchema: mongoose.model("reset Pin", resetPinSchema)
}