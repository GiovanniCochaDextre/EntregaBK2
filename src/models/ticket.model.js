import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const TicketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: Number,
  purchaser: String,
});


export default model("Ticket", TicketSchema);