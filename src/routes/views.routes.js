import { Router } from "express";
import { verifyToken } from "../utils/index.js";
import passport from "passport";

const router = Router();

router.get('/',(req,res) => {
    res.render('home',{title: "HOME"});
});

router.get('/register',(req,res) => {
    res.render('register',{title: "REGISTRO"});
});

router.get('/login',(req,res) => {
    res.render('login',{title: "INGRESAR"});
});


router.get('/find',(req,res) => {
    res.render('current',{title: "DATOS ACTUALES"});
});


router.get("/current", (req, res) => {
    const token= req.signedCookies.tokenCookie
    // vlaidar si existe
    if (token) {
        const userToken = verifyToken(token)
        //validar user

        if (userToken) {
            req.user= userToken.user
            res.render("current", { title: "DATOS ACTUALES" ,user:req.user});
        }
        else {
            res.render('login',{title: "INGRESAR"});
        }
    } else {
        res.render('login',{title: "INGRESAR"});
    }
});

router.get('/profile',(req,res) => {
    const user = { ...req.user };
    //console.log(user);
    res.render('profile',{title: "PROFILE", user: user._doc});
});

//google
router.get('/auth/google/callback', passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login"
}));


router.get('/recupero',(req,res) => {
    res.render('recupero',{title: "Recuperar Password"});
});

router.get("/results", (req, res) => {
    const users = req.session.users; // Accede a los usuarios desde la sesión
    req.session.users = null;     
    res.render("results", { title: "Resultados de búsqueda", users: users });
});

export default router;