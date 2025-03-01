import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from 'cors';

//import mongoose from "mongoose";
//import userRoutes from './routes/session.routes.js';
import userRoutes from './routes/users.routes.js';
import productRoutes from './routes/products.routes.js';
import viewsRoutes from './routes/views.routes.js';
//import connectDB from './database/index.js';
import MongoDBSingleton from "./database/index.js";


//parte2
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import entorno from "./config/env.js";
//console.log(entorno);


//settings
const app = express();
app.set("PORT", entorno.port || 3000);
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

const clave_session_cookie = entorno.clave_session_cookie;

//si db local
//const mongodbUri = "mongodb://127.0.0.1:27017/mongo-store"

//si uso db en nube
const mongodbUri= entorno.mongodb_url
const firmaCookie= entorno.firma_cookie

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser(firmaCookie));

//en caso desee limitar las conexiones entrantes al api
// const corsOptions ={
//   origin : ["http://127.0.0.1:5000","http://127.0.0.1:5500"]
// }
// app.use(cors(corsOptions));
app.use(cors());

app.use(
  session({
      store: MongoStore.create({
      mongoUrl : mongodbUri,
      ttl:15
  }),
  secret: clave_session_cookie,
  resave: false,
  saveUninitialized:false
}))

//PARTE2
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


//routes
app.get("/", (req, res) => {
  res.render("home", { title: "HOME" });
});

//app.use('/api/sessions', userRoutes)
app.get('/find/:last_name', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/', viewsRoutes);

//listeners
//connectDB(mongodbUri);
MongoDBSingleton.getInstance();

app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});


// Listeners en NODE
process.on("exit", (code) => {
  console.log("esto se ve cuando finaliza el proceso");
});
process.on("uncaughtException", (exception) => {
  console.log("Esto captura un error no controlado");
});
// process.exit()//return
