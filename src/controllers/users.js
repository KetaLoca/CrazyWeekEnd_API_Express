import { UserModel } from "../models/users";
import { validateUser, validatePartialUser } from "../schemas/user";

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

        await UserModel.create(result.data)

        res.status(201).json(result)
    }

    static update = async (req, res) => {
        const result = validatePartialUser(req.body)
        if (result.error) {
            return res.status(400).json({ message: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        
        await UserModel.update(id, result.data)

        res.json({ message: 'Datos de usuario modificados correctamente' })
    }

    static delete = async (req, res) => {
        const { id } = req.params
        const result = await UserModel.delete(id)
        if (result) {
            return res.json({ message: 'User deleted' })
        }
        res.json({ message: 'User not found' })
    }

}