const { signup, deleteMe } = require('./mutation')
const { me, getSaved, ping, login } = require('./query')

const resolvers = {
    Query: {
        ping,
        me,
        login,
        getSaved
    },
    Mutation: {
        deleteMe,
        signup
    }
}

module.exports = resolvers