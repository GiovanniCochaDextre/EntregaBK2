import Cart from "../models/cart.model.js";

class CartDAO {
  async create(cart) {
    const newCart = new Cart(cart);
    return await newCart.save();
  }

  async save(cart) {
    return await cart.save();
  }

  async findById(id) {
    return await Cart.findById(id).populate("products.product");
  }


}

export default new CartDAO();