const getMyFiles = require('./query')
const upload = require('./mutation')

const resolvers = {
    Query: {
        getMyFiles
    },
    Mutation: {
        upload
    }
}

module.exports = resolvers