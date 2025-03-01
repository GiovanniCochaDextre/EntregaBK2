import { Router } from "express";
import passport from "passport";
//import mongoose from "mongoose"

import usersModel from "../models/users.models.js";
import userController from "../controllers/users.controller.js";



const router = Router();

router.get("/", userController.getUsersAll);

router.get("/:id", userController.getUserById);

router.post("/register", userController.registerUser);

router.post("/login", userController.login);

router.post('/recupero', userController.recuperoPassword);


//router.param
router.param("last_name", async (req, res, next, last_name) => {
    const regex = /^[a-zA-Z ]{2,254}$/;

    if (!regex.test(last_name)) {
        return res
        .status(400)
        .json({ error: "El APELLIDO no debe contener caracteres especiales" });
    }

    try {
        const users = await usersModel.find({ last_name: last_name });
        if (users.length === 0) {
           return res.status(404).json({ error: "Usuario no encontrado" });
        }
        req.session.users = users;
        //req.user = users;
        next();
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
});

router.get("/find/:last_name", (req, res) => {
    //res.render("results", { title: "Resultados de búsqueda", users: req.users });
    res.redirect('/results')
  });

  // manejo de rutas inexistentes
router.get("*", (req, res) => {
    res.status(404).json({ message: "Recurso no encontrado" });
});



//PASSPORT ***************************************************************************
router.post(
    '/register', 
    passport.authenticate('register', {failureRedirect:'failregister'}), 
    async(req,res) => {
        res.redirect("/login");
   }
);

router.get("/failregister", (req, res) => {
    res
        .status(400)
        .send({status: "error", message: "Error al registrar el usuario"});
});

router.post(
    '/login', 
    passport.authenticate('login', {failureRedirect:'faillogin'}), 
    async(req,res) => {
        res.redirect("/profile");
   }
);

router.get("/faillogin", (req, res) => {
    res
        .status(400)
        .send({status: "error", message: "Error al realizar login"});
});

router.get('/auth/google', passport.authenticate('google',{scope:["email", "profile"]}));

router.post('/logout', (req,res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });

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
