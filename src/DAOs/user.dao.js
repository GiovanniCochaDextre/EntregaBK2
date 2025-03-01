import UserModel from "../models/users.model.js";

class UserDAO {
  async create(user) {
    return await UserModel.create(user);
  }

  async findById(id) {
    return await UserModel.findById(id).populate("cart");
  }

  async update(id, user) {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email }).populate("cart");
  }
}

export default new UserDAO();