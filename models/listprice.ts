import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Definir el esquema para los elementos del menú
const menuItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

// Definir el esquema para las subcategorías
const subcategorySchema = new Schema({
    name: { type: String, required: true },
    items: [menuItemSchema], // Relación uno a muchos con los elementos del menú
});

// Definir el esquema para las categorías
const categorySchema = new Schema({
    name: { type: String, required: true },
    subcategories: [subcategorySchema], // Relación uno a muchos con las subcategorías
});

// Definir el esquema principal para el menú
const menuSchema = new Schema({
    categories: [categorySchema], // Relación uno a muchos con las categorías
});

// Crear el modelo utilizando el esquema
const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;
