const columns = [
    { name: "ID", uid: "_id", sortable: false },
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "DESCRIOTION", uid: "description" },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
];

export { columns, statusOptions };
