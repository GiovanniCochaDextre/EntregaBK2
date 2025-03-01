import { hashSync, compareSync, genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";
import entorno from "../config/env.js";

const JWT_SECRET = entorno.firma_JWT;

export const createHash = (password) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const isValidPassword = (password, passwordHash) => {
  return compareSync(password, passwordHash);
};

export const generateToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: "5m" });
};

export const verifyToken=(token)=>{
  try {
    return jwt.verify(token,JWT_SECRET)
  } catch (error) {
    return null
  }
}

export const authToken = (req,res,next)=>{
    const authHader= req.headers.authorization;
    if(!authHader)return res.stauts(401).send({error:"No autenticado"})
        const token=authHader.split(' ')[1]

    //console.log(token);
    jwt.verify(token,secretoGuardado,(error,credentials)=>{
        if(error) return res.status(403).send({error:"No autorizado"})

            req.user= credentials.user
            next()
    })
}