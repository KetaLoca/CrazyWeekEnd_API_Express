import db from '../../knexDB.js'

export class AlojamientosModel {

    static async getAll() {
        const alojamientos = db('CrazyWeekEnd.alojamientos').select('*')
        return alojamientos
    }

    static async getByEmail(email) {

    }

    static async getById(id) {

    }

    static async create(input) {

    }

    static async delete(id) {

    }
}