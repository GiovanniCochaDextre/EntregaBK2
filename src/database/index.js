import mongoose from "mongoose";
import env from '../config/env.js';

class MongoDBSingleton {
    static #instance
    static getInstance() {
        if (!MongoDBSingleton.#instance) {
            try {
                mongoose.connect(env.mongodb_url);
                MongoDBSingleton.#instance = mongoose.connection;
                console.log("Database conectada correctamente");
            } catch (error) {
                console.log('Error al conectar la database'+ error.message);
            }
        } else {
            console.log('Conexión ya existe');
        }
        return MongoDBSingleton.#instance;
    }
}

export default MongoDBSingleton;

// export default async function connectDb(uri){
//     try {
//         await mongoose.connect(uri)
//         console.log('Database conectada correctamente');
        
//     } catch (error) {
//         console.log('Error al conectar la database'+ error.message);
        
//     }
// }