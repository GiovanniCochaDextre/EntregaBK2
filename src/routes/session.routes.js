import { Router } from "express";

//parte1
import userModel from '../models/users.models.js';
import {createHash, isValidPassword} from '../utils.js'

//parte2
import passport from "passport";

const router = Router();


//parte1
// router.post('/register', async(req, res) => {
//     const {first_name, last_name, email, password} = req.body;

//     try {
//         const userExist = await userModel.findOne({email:email});
//         if(userExist) {
//             return res.status(400).json({message:"El correo ya existe"});
//         }
        
//         await userModel.create({
//             first_name, 
//             last_name, 
//             email, 
//             password : createHash(password),
//         });

//         res.status(201).redirect('/login');

//     } catch (error) {
//         res.status(500).json({message: "Error interno del servidor", err: error.message});
//     }
// })


// router.post('/login', async(req, res) => {
//     const {email, password} = req.body;

//     try {
//         const userExist = await userModel.findOne({email:email});
//         if(userExist) {

//             const isValid = isValidPassword(password, userExist.password)

//             if (isValid) {
//                 req.session.user={
//                     first_name: userExist.first_name,
//                     last_name: userExist.last_name,
//                     email: userExist.email
//                 }

//                 res.redirect('/profile')
//             } else {
//                 res.status(401).send("Password Invalido")
//             }
//         } else {
//             res.status(401).send("Usuario Invalido")
//         }
//     } catch (error) {
//         res.status(500).json({message: "Error interno del servidor", err: error.message});
//     }
// })


//parte2
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


//recuperar password
router.post('/recupero', async (req,res) => {
    const {email, password} = req.body
    try {
        if(!email || !password)
            req.status(400).send("Email y/o contraseña requerido")

        const userFound = await userModel.findOne({email})
        const hashPass = createHash(password)
        userFound.password = hashPass

        await userFound.save()
        res.redirect('/login')
    } catch (error) {
        
    }
});

//logout 
router.post('/logout', (req,res, next) => {
    //logout basico session-express
    // if (req.session.user) {
    //     req.session.destroy((err)=>{
    //         if (!err){
    //             res.clearCookie('connect.sid')
    //             res.redirect('/login')
    //         } else {
    //             res.send("error al cerrar la sesión")
    //         }
    //     })
    // }

    //logout que trabaja con passport
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

export default router;