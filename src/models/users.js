import db from "../../knexDB.js"

export class UserModel {

    static getById = async (email) => {
        const user = await db('CrazyWeekEnd.users').where('email', email).first().select('*')
        return user
    }

    static create = async (input) => {
        const result = await db('CrazyWeekEnd.users').insert(input).returning('*')
        return result
    }

    static update = async (email, input) => {
        const result = await db('CrazyWeekEnd.users').where('email', email).update(input).returning('*')
        return result
    }

    static delete = async (email) => {
        const result = await db('CrazyWeekEnd.users').where('email', email).del()
        return result
    }
}