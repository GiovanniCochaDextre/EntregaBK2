import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createHash = (password) => {
    //salt 'string aleatorio' , el #10 es la cantidad de veces que se va a encriptar, número más grande => más recursos
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const secretoGuardado="clavesecreta"
export const generateToken =(user)=>{
    return jwt.sign({user},secretoGuardado,{expiresIn:"24h"})
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