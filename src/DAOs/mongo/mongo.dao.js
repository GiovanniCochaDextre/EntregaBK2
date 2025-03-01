import productModel from './model/product.model.js';

export default class Products {
    constructor() {
        get = async() => {
            return await productModel.find();
        }
    }
}