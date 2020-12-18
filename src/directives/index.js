const isAuth = require('./check_auth')

module.exports = {
    typeDefs: [
        isAuth.typeDef
    ], schemaDirectives: {
        isAuth: isAuth.directive
    }
}