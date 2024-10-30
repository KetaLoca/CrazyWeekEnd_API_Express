import db from "../../knexDB.js";

export class ReservasModel {

    static async getById(id) {
        const reserva = await db("CrazyWeekEnd.reservas").where('id', id).first().select('*')
        return reserva
    }

    static async getByEmail(email) {
        const reservas = await db("CrazyWeekEnd.reservas").where('userEmail', email).select('*')
        return reservas
    }

    static async getByAlojamiento(id) {
        const reservas = await db("CrazyWeekEnd.reservas").where('alojamientoId', id).select('*')
        return reservas
    }

    static async create(input) {
        const result = await db("CrazyWeekEnd.reservas").insert(input).returning('*')
        return result
    }

    static async delete(id) {
        const result = await db("CrazyWeekEnd.reservas").where('id', id).del()
        return result
    }
}