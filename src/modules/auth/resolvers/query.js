const User = require('../../../models/User')
const { AuthenticationError } = require('apollo-server-express')
const genToken = require('../../../utils/auth')
const bcrypt = require('bcrypt')

const login = async(_, { email, password }) => {
    const user = await User.findOne({email: email, active: true})
    if (!user)
        throw new AuthenticationError("No User Found")
    const checkPass = await bcrypt.compare(password, user.password)
    if (!checkPass)
        throw new AuthenticationError("Bad password")
    const token = genToken.createToken(user._id)
    return {
        user: {
            ...user._doc,
            id: user._id
        },
        token
    }
}

const ping = () => {
    return "Pong"
}

const me = async (_, args, { user }) => ({
    ...user._doc,
    id: user.id
})

const getSaved = async(_, {}, { user }) => {
    const posts = await User.findOne({_id: user.id}).populate('savedpost')
    var saved = posts.savedpost
    return saved
}

module.exports = {
    me,
    getSaved,
    ping,
    login
}
