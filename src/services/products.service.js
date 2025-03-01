import productsModel from "../models/products.models.js";

const getProductsAll = async () => {
  return await productsModel.find();
};

const getProductById = async (id) => {
  return await productsModel.findOne({ _id: id}); 
};

const deleteProduct = (id) => {
  return products.filter((product) => product.id !== id);
};


export default { getProductsAll, getProductById, deleteProduct };
