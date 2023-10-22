import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import { USERS_ROLES } from "../config.js"


export const register = async (req, res) => {
    const { email, password, username, name, lastname, date, salary } = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            name: name,
            lastname: lastname,
            date: date,
            salary: salary
        });
        const userSaved = await newUser.save();
        const token = await createAccesToken({ id: userSaved._id });
        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
            salary: userSaved.salary,
            name: userSaved.name,
            lastname: userSaved.lastname,
            date: userSaved.date

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });
        const IsMatch = await bcrypt.compare(password, userFound.password);
        if (!IsMatch)
            return res.status(400).json({ message: "Incorrect password" });
        const token = await createAccesToken({ id: userFound._id });

        if (userFound.status != 1) return res.status(400).json({ message: "Disabled user" });

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            name: userFound.name,
            lastname: userFound.lastname,
            createdAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
            salary: userFound.salary,
            date: userFound.date,
            status: userFound.status,
            role: userFound.role,
            placerole: USERS_ROLES[userFound.role],
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200)
}


export const update = (req, res) => {
    console.log(req.body);
    const userFound = User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!userFound) return res.status(400).json({ message: "User not found" })
    res.json({ message: "User updated" })
}


export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound) return res.status(400).json({ message: "User not found" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt

    })
    res.send("Profile")
}

export const profiles = async (req, res) => {
    const usersFound = await User.find()
    const userWork = usersFound.filter(user => user.role == 2)
    if (!usersFound) return res.status(400).json({ message: "Not found Users" })

    return res.json(userWork)
    res.send("Profile")
}