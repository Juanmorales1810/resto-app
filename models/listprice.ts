import mongoose, { Schema, Document } from "mongoose";

interface IMenu {
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
}

export interface IMenuSchema extends Document {
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
}

// Definir el esquema para los elementos del menú
const ItemSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        description: { type: String, required: true, trim: true },
        image: { type: String, required: true },
        price: { type: Number, required: true, trim: true },
        category: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Crear el modelo utilizando el esquema
const Menu = mongoose.models.Menu || mongoose.model("Menu", ItemSchema);

export default Menu;
