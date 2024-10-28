import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config'

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'No está autenticado' })
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' })
        }

        req.user = user
        next()
    })
}