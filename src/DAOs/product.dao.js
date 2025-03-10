import ProductModel from "../models/product.model.js";

class ProductDAO {
  async create(product) {
    return await ProductModel.create(product);
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

  async update(id, product) {
    return await ProductModel.findByIdAndUpdate(id, product, { new: true });
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async findAll() {
    return await ProductModel.find();
  }
}

export default new ProductDAO();