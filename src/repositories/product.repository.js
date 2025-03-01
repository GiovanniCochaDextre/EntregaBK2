import ProductDAO from "../DAOs/product.dao.js";

class ProductRepository {
  async create(product) {
    return await ProductDAO.create(product);
  }

  async findById(id) {
    return await ProductDAO.findById(id);
  }

  async findAll() {
    return await ProductDAO.findAll();
  }

  async update(id, product) {
    return await ProductDAO.update(id, product);
  }

  async delete(id) {
    return await ProductDAO.delete(id);
  }
}


export default new ProductRepository();