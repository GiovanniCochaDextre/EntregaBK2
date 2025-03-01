import TicketDAO from "../DAOs/ticket.dao.js";

class TicketRepository {
  async create(ticket) {
    return await TicketDAO.create(ticket);
  }

  async findById(id) {
    return await TicketDAO.findById(id);
  }

  async findAll() {
    return await TicketDAO.findAll();
  }
}


export default new TicketRepository();