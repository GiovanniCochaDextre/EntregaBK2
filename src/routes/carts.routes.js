import { Router } from "express";
import CartRepository from "../repositories/cart.repository.js";
import { isUser } from "../middlewares/auth.js";

const router = Router();

// Ruta para crear un nuevo carrito (solo para usuarios)
router.post("/", isUser, async (req, res) => {
  try {
    const cart = await CartRepository.create({ user: req.user._id, products: [] });
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para agregar un producto al carrito (solo para usuarios)
router.post("/:cid/products", isUser, async (req, res) => {
  try {
    const { cid } = req.params;
    const { productId, quantity } = req.body;
    const cart = await CartRepository.findById(cid);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const product = cart.products.find(p => p.product._id.toString() === productId);
    if (product) {
      product.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await CartRepository.save(cart);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;