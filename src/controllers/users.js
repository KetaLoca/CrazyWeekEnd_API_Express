import { UserModel } from "../models/users.js";
import { validateUser, validatePartialUser } from "../schemas/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js";

export class UserController {

    static getById = async (req, res) => {
        const id = req.user.email
        const user = await UserModel.getById(id)
        if (user) {
            return res.json(user)
        }
        res.status(404).json({ message: 'User not found' })
    }

    static getAuth = async (req, res) => {
        const email = req.user.email
        return res.status(200).json(email)
    }

    static register = async (req, res) => {
        const result = validateUser(req.body)
        if (result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }

        const user = await UserModel.getById(result.data.email)
        if (user) {
            return res.status(409).json({ message: 'User already exists' })
        }

        result.data.password = await bcrypt.hash(result.data.password, 10)
        await UserModel.create(result.data)
            .then(() => { res.status(201).json(result.data.email) })
            .catch((e) => { res.status(500).json({ message: 'Error registrando el usuario' }) })


    }

    static login = async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Faltan el email o la password' })
        }

        const user = await UserModel.getById(email)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const comprobar = await bcrypt.compare(password, user.password)
        if (comprobar) {
            const token = jwt.sign({ email: user.email }, SECRET_KEY)

            res.cookie('token', token, { httpOnly: true })

            return res.status(200).json({ message: 'Login correcto' })
        }
        res.status(401).json({ message: 'Password incorrecta' })
    }

    static logout = (req, res) => {
        res.clearCookie('token')
        res.status(200).json({ message: 'Sesión cerrada correctamente' })
    }

    static update = async (req, res) => {
        const result = validatePartialUser(req.body)
        if (result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }

        const { id } = req.params
        if (id != req.user.email) {
            return res.status(403).json({ message: 'Acceso no autorizado' })
        }

        const comprobar = await UserModel.getById(id)
        if (!comprobar) {
            return res.status(404).json({ message: 'User not found' })
        }

        await UserModel.update(id, result.data)
            .then(() => {
                res.json({ message: 'Datos de usuario modificados correctamente' })
            })
            .catch((e) => {
                res.json({ message: 'Error modificando el usuario' })
            })

    }

    static delete = async (req, res) => {
        const { id } = req.params
        if (id != req.user.email) {
            return res.status(403).json({ message: 'Acceso no autorizado' })
        }

        const result = await UserModel.getById(id)
        if (result) {
            await UserModel.delete(id)
                .then(() => { return res.status(200).json({ message: 'User deleted' }) })
                .catch((e) => { return res.status(500).json({ message: 'Error deleting the user' }) })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    }
}