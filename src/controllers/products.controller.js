import mongoose from "mongoose"
import productsModel from "../models/products.models.js";
import productsService from '../services/products.service.js';

const getProductsAll = async (req, res) => {
    try {
        const products = await productsService.getProductsAll(); //await productsModel.find();

        res.status(200).json({ status: "Ok", payload: products });
    } catch (error) {
        res.status(500).json({ status: "Error ", error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "Error", message: "ID inválido" });
        }

        const productFound = await productsModel.findOne({ _id: id}); 
        if (!productFound) {
            return res.status(404).json({ status: "Error", message: "Producto no encontrado" });
        }
        res.status(200).json({ status: "Ok", payload: productFound });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
}

const registerProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        // validar si hay que vengan los campos
        const newProduct = {
            name,
            price,
            stock,
        };
    
        await productsModel.create(newProduct);
        res.status(201).json({ status: "Ok", payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: "Error ", error: error.message });
    }
};



export default {getProductsAll, getProductById, registerProduct};