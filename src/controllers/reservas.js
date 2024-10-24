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
        const { email } = req.params
        const reservas = await ReservasModel.getByEmail(email)
        if (reservas) {
            return res.status(200).json(reservas)
        }
        res.status(404).json({ message: 'No se encontraron reservas asociadas al usuario' })
    }

    static async create(req, res) {
        const reserva = validateReserva(req.body)
        if (reserva.error) {
            return res.status(400).json(JSON.parse(reserva.error.message))
        }
        await ReservasModel.create(reserva)
            .then(() => { return res.status(201).json(reserva) })
            .catch((e) => { return res.status(500).json({ message: 'Error añadiendo la reserva' }) })
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