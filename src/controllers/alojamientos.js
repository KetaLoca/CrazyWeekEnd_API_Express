import { AlojamientosModel } from "../models/alojamientos";
import { validateAlojamiento, validatePartialAlojamiento } from "../schemas/alojamiento";

export class AlojamientosController {

    static async getAlojamientos(req, res) {
        const { userEmail } = req.query
        if (userEmail) {
            const alojamientos = await AlojamientosModel.getByEmail(userEmail)
            if (alojamientos) {
                return res.status(200).json(alojamientos)
            }
        } else {
            const alojamientos = await AlojamientosModel.getAll()
            if (alojamientos) {
                return res.status(200).json(alojamientos)
            }
        }
        res.status(404).json({ message: 'No se pudieron recuperar los alojamientos' })
    }

    static async getAlojamientoById(req, res) {
        const { id } = req.params
        const alojamiento = AlojamientosModel.getById(id)
        if (alojamiento) {
            return res.status(200).json(alojamiento)
        }
        res.status(404).json({ message: 'Alojamiento no encontrado' })
    }

    static async create(req, res) {
        const result = validateAlojamiento(req.body)
        if (result.error) {
            return res.status(404).json(result.error.message)
        }

        const alojamiento = AlojamientosModel.getById(result.data.id)
        if (alojamiento) { return res.status(409).json({ message: 'El alojamiento ya existe' }) }

        await AlojamientosModel.create(result)
            .then(() => { return res.status(201).json(result) })
            .catch((e) => { return res.status(500).json({ message: 'Error añadiendo el alojamiento' }) })
    }

    static async delete(req, res) {

    }
}