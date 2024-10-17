import { UserModel } from "../models/users.js";
import { validateUser, validatePartialUser } from "../schemas/user.js";

export class UserController {

    static getById = async (req, res) => {
        const { id } = req.params
        const user = await UserModel.getById(id)
        if (user) {
            return res.json(user)
        }
        res.status(404).json({ message: 'User not found' })
    }

    static create = async (req, res) => {
        const result = validateUser(req.body)
        if (result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }

        const user = await UserModel.getById(result.data.email)
        if (user) {
            return res.status(409).json({ message: 'User already exists' })
        }

        await UserModel.create(result.data)

        res.status(201).json(result.data)
    }

    static update = async (req, res) => {
        const result = validatePartialUser(req.body)
        if (result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }

        const { id } = req.params
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
        const result = await UserModel.getById(id)
        if (result) {
            await UserModel.delete(id)
            return res.status(200).json({ message: 'User deleted' })
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    }
}