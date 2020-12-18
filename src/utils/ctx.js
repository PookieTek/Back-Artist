const User = require('../models/User')
const Auth = require('./auth')

const getUser = async req => {
    if (!req)
        return null
    const token = req.get('x-token')
    if (!token)
        return null
    try {
        const dtoken = await Auth.decodeToken(token)
        return await User.findById(dtoken.userId)
    } catch (err) {
        return null
    }
}

module.exports = {
    getUser
}
