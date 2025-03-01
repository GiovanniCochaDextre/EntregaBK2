import TicketModel from "../models/ticket.model.js";

class TicketDAO {
  async create(ticket) {
    return await TicketModel.create(ticket);
  }

  async findAll() {
    return await TicketModel.find();
  }

  async findById(id) {
    return await TicketModel.findById(id);
  }

}

export default new TicketDAO();