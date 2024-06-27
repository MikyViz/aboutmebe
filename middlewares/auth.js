import sequelize from 'sequelize'
import {User}  from '../dataBase/index.js'
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    let token = req.headers['authorization']
    try {
        token = token.replace('Bearer ', '')
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id } = decoded
        const user = await User.findOne({ where: { id } })
        req.user = user
        req.token = token
    } catch (err) {
        return res.status(401).send({ error: 'Not authorized to access this resource💩' })
    }

    return next()
}

export default auth