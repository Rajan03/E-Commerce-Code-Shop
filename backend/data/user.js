import bcrypt from "bcryptjs";

export const users = [
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync('admin@1234', 10),
        isAdmin: true
    },
    {
        name: "Daniel",
        email: "daniel@example.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "John",
        email: "john@example.com",
        password: bcrypt.hashSync('123456', 10),
    },
]