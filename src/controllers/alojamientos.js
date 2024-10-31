import { AlojamientosModel } from "../models/alojamientos.js";
import { validateAlojamiento, validatePartialAlojamiento } from "../schemas/alojamiento.js";

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
        const alojamiento = await AlojamientosModel.getById(id)
        if (alojamiento) {
            return res.status(200).json(alojamiento)
        }
        res.status(404).json({ message: 'Alojamiento no encontrado' })
    }

    static async create(req, res) {
        const result = validateAlojamiento(req.body)
        if (result.error) {
            console.log(result.error.message)
            return res.status(404).json(result.error.message)
        }

        const alojamiento = await AlojamientosModel.getById(result.data.id)
        if (alojamiento) { return res.status(409).json({ message: 'El alojamiento ya existe' }) }

        await AlojamientosModel.create(result.data)
            .then(() => { return res.status(201).json(result) })
            .catch((e) => {
                console.log(e)
                return res.status(500).json({ message: 'Error añadiendo el alojamiento' })
            })
    }

    static async delete(req, res) {
        const { id } = req.params
        const alojamiento = await AlojamientosModel.getById(id)
        if (alojamiento) {
            await AlojamientosModel.delete(id)
                .then(() => { return res.status(200).json({ message: 'Alojamiento eliminado correctamente' }) })
                .catch((e) => { return res.status(500).json({ message: 'Error eliminando el alojamiento' }) })
        } else res.status(404).json({ message: 'El alojamiento que quiere eliminar no existe' })
    }
}