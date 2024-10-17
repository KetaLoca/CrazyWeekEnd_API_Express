import db from "../../knexDB.js"

export class UserModel {

    static getById = async (email) => {
        const user = await db('CrazyWeekEnd.users').where('email', email).first().select('*')
        return user
    }

    static create = async (input) => {

    }

    static update = async (id, input) => {

    }

    static delete = async (id) => {

    }
}