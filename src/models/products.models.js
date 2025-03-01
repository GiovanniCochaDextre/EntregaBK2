import { Schema, model} from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: false,
        default: 0
    }
});

export default model("Product", ProductSchema);