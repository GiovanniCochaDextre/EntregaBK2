import passport from "passport";
import local from "passport-local";
import {Strategy as GoogleStrategy} from 'passport-google-oauth2'

import userModel from "../models/users.models.js";
import {createHash, isValidPassword} from '../utils/index.js';
import entorno from "./env.js";
//import {createHash, isValidPassword} from '../utils.js'
import { request } from "express";


const clientGoogle = entorno.client_google; //"412479791105-vuoqdc9gia73kvr8jgrh4g17vf13meni.apps.googleusercontent.com"
const secretGoogle = entorno.secret_google;  //"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"
const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        'register', 
        new localStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async (req, username, password, done) => {
            const {first_name, last_name, email, age, role } = req.body
            try {
                const user = await userModel.findOne({email:username});
                if (user) {
                    console.log("Usuario ya existe");
                    return done(null, false)
                }

                const newUser={
                    first_name, 
                    last_name, 
                    email, 
                    password: createHash(password),
                    age,
                };

                if (role) newUser.role = role;

                const result = await userModel.create(newUser) 
                return done(null, result)

            } catch (error) {
                return done(`error al crear el usuario ${error}`)
            }
        }
    ));

    passport.use(
        'login', 
        new localStrategy(
            {
                usernameField: "email", passReqToCallback: true
            },
            async(req, username, password, done)=>{
            try {
                const userExist = await userModel.findOne({email: username});
                if (!userExist)
                    return done(null, false);

                const isValid = isValidPassword(password, userExist.password);
                if (!isValid)
                    return done(null, false);
                
                req.session.user={
                    first_name: userExist.first_name,
                    last_name: userExist.last_name,
                    email: userExist.email,
                    age: userExist.age,
                    cart: userExist.cart,
                    role: userExist.role,
                };
                
                return done(null, userExist);
            
            } catch (error) {
                return done(error);
            }
    }));


    //google register y login
    passport.use('google',
        new GoogleStrategy({
            clientID: clientGoogle,
            clientSecret: secretGoogle,
            callbackURL: 'http://localhost:3000/auth/google/callback' 
        }, async(request, accessToken, refreshToken, profile, done) => {
            try {
                const userFound = await userModel.findOne({email: profile.emails[0]?.value });
                if (userFound) {
                    return done(null, userFound);
                }

                const newUser = {
                    first_name: profile.name.givenName || "",
                    last_name: profile.name.familyName || "",
                    email: profile.emails[0]?.value || "",
                    password: "",
                };

                const user = await userModel.create(newUser)
                return done(null, user)

            } catch (error) {
                return done(error);
            }
        })
    )


    passport.serializeUser((user,done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async(id,done) => {
        const user = await userModel.findById(id)
        done(null, user)
    });
};

export default initializePassport;
