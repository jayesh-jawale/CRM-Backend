const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
    },
    subject: {
        type: String,
        maxlength: 1000,
        required: true,
        default: true,
      },
      status: {
        type: String,
        maxlength: 50,
        required: true,
        default: "Pending operator response"
      },
      openedAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      conversations: [
          {
            sender: {
                type: String,
                maxlength: 50,
                required: true,
                default: "",
              },
              message: {
                type: String,
                maxlength: 500,
                required: true,
                default: "",
              },
              messageAt: {
                type: Date,
                required: true,
                default: Date.now(),
              },
          },
      ],
});

// We canot directly export ticketSchema here, we can usie it by creating a model out of here
module.exports = {
    ticketSchema: mongoose.model("Tickets", ticketSchema)
}