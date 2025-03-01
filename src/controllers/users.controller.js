import mongoose from "mongoose"
import usersModel from "../models/users.models.js";
import usersService from '../services/users.service.js';
import { isValidPassword, createHash, generateToken } from "../utils/index.js";

const getUsersAll = async (req, res) => {
    try {
        const users = await usersService.getUsersAll(); //await usersModel.find();

        res.status(200).json({ status: "Ok", payload: users });
    } catch (error) {
        res.status(500).json({ status: "Error ", error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: "Error", message: "ID inválido" });
        }

        const userFound = await usersModel.findOne({ _id: id}); 
        if (!userFound) {
            return res.status(404).json({ status: "Error", message: "Usuario no encontrado" });
        }
        res.status(200).json({ status: "Ok", payload: userFound });
    } catch (error) {
        res.status(500).json({ status: "Error", error: error.message });
    }
}

const registerUser = async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
    try {
        // validar si hay que vengan los campos
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
        };
    
        if (role) newUser.role = role;
    
        await usersModel.create(newUser);
        // res.status(201).json({ status: "Ok", payload: newUser });
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ status: "Error ", error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // validar si hay que vengan los campos
        const userFound = await usersModel.findOne({ email });

        if (userFound) {
            const isvalid = isValidPassword(password, userFound.password);
            // validar si el paass no coincide
        
            if (isvalid) {
                const user = userFound._doc;
                delete user.password;
                //console.log(user);
                
                // generar token
                const token = generateToken(user);
                //console.log(token);
                
                //guardar el token en una cookie
                res.cookie("tokenCookie", token, { signed: true });
            
                // res.status(200).json({ status: "Ok" });
                res.redirect("/current");
            } else {
                res.status(401).send("Usuario y/o Password Invalido")
            }
        } else {
            res.status(401).send("Usuario y/o Password Invalido")
        }

    } catch (error) {
        res.status(500).json({ status: "Error ", error: error.message });
    }

};

const recuperoPassword = async (req,res) => {
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
};


export default {getUsersAll, getUserById, registerUser, login, recuperoPassword};