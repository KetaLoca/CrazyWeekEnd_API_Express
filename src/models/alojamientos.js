import db from '../../knexDB.js'

export class AlojamientosModel {

    static async getAll() {
        const alojamientos = await db('CrazyWeekEnd.alojamientos').select('*')
        return alojamientos
    }

    static async getByEmail(email) {
        const alojamientos = await db('CrazyWeekEnd.alojamientos').where('userEmail', email).select('*')
        return alojamientos
    }

    static async getById(id) {
        const alojamiento = await db('CrazyWeekEnd.alojamientos').where('id', id).first.select('*')
        return alojamiento
    }

    static async create(input) {
        const result = await db('CrazyWeekEnd.alojamientos').insert(input).returning('*')
        return result
    }

    static async delete(id) {
        const result = await db('CrazyWeekEnd.alojamientos').where('id', id).del()
        return result
    }
}