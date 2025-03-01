import { Router } from "express";

import productsModel from "../models/products.models.js";
import productController from "../controllers/products.controller.js";

const router = Router();

router.get("/", productController.getProductsAll);

router.get("/:id", productController.getProductById);

router.post("/register", productController.registerProduct);


//router.param
router.param("name", async (req, res, next, name) => {
    const regex = /^[a-zA-Z ]{2,254}$/;

    if (!regex.test(name)) {
        return res
        .status(400)
        .json({ error: "El nombre del producto no debe contener caracteres especiales" });
    }

    try {
        const products = await productsModel.find({ name: name });
        if (products.length === 0) {
           return res.status(404).json({ error: "Producto no encontrado" });
        }
        req.session.products = products;
        next();
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

router.get("/find/:name", (req, res) => {
    res.status(201).json({ status: "Ok", payload: req.session.products });
  });

  // manejo de rutas inexistentes
router.get("*", (req, res) => {
    res.status(404).json({ message: "Recurso no encontrado" });
});



router.get('/current', (req,res) => {
    //si no tiene una sesion activa
    if (!res.session.user) 
        return res.redirect('/login')

    //si tiene sesion activa
    res.send("Hola")
})

//E*******************************************************************************



export default router;
