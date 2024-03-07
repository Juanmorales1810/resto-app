const columns = [
    { name: "ID", uid: "_id", sortable: false },
    { name: "Nombre", uid: "name" },
    { name: "Categoría", uid: "role" },
    { name: "Precio", uid: "price" },
    { name: "Estado", uid: "status" },
    { name: "Descripción", uid: "description" },
    { name: "Acciones", uid: "actions" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
];

export { columns, statusOptions };
