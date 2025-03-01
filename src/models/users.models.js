import { Schema, model} from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        //required: true,
    },
    cart: {
        type: String,
        //required: true,
    },
    role: {
        type: String,
        default: "user"
        //required: true,
    }
});

export default model("User", UserSchema);