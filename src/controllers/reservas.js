import { ReservasModel } from "../models/reservas.js";
import { validateReserva, validatePartialReserva } from "../schemas/reserva.js"

export class ReservasController {

    static async getById(req, res) {
        const { id } = req.params
        const reserva = await ReservasModel.getById(id)
        if (reserva) {
            return res.status(200).json(reserva)
        }
        res.status(404).json({ message: 'No se ha podido recuperar la reserva' })
    }

    static async getByEmail(req, res) {
        const { email } = req.query
        const reservas = await ReservasModel.getByEmail(email)
        if (reservas.length != 0) {
            return res.status(200).json(reservas)
        }
        res.status(404).json({ message: 'No se encontraron reservas asociadas al usuario' })
    }

    static async create(req, res) {
        const result = validateReserva(req.body)
        if (result.error) {
            return res.status(400).json(JSON.parse(result.error.message))
        }
        await ReservasModel.create(result.data)
            .then(() => { return res.status(201).json(result.data) })
            .catch((e) => { console.log(e); return res.status(500).json({ message: 'Error añadiendo la reserva' }) })
    }

    static async delete(req, res) {
        const { id } = req.params
        const reserva = await ReservasModel.getById(id)
        if (!reserva) {
            return res.status(404).json({ message: 'La reserva que desea eliminar no existe' })
        }
        await ReservasModel.delete(id)
            .then(() => { return res.status(204) })
            .catch((e) => { return res.status(500).json({ message: 'Error eliminando la reserva' }) })
    }
}