const config = require('../config')
const jwt = require('jsonwebtoken')

const createToken = userId => new Promise((resolve, rej) => {
    jwt.sign({
        userId
    },
    config.JWT_SECRET,
    {
        expiresIn: config.JWT_TIME
    }, (err, token) => {
        if (err) {
            return rej(err)
        }
        resolve(token)
    })
})

const decodeToken = token => new Promise((resolve, rej) => {
    jwt.verify(token, config.JWT_SECRET, (err, decToken) => {
        if (err) {
            return rej(err)
        }
        if (!decToken.exp || !decToken.iat)
            return rej(new Error("error token"))
        resolve(decToken)
    })
})

module.exports = {
    createToken,
    decodeToken
}