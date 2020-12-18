const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')

const typeDef = gql`
    directive @isAuth on FIELD_DEFINITION
`
class IsAuth extends SchemaDirectiveVisitor {
    visitFieldDefinition (field) {
        const { resolve = defaultFieldResolver } = field
        field.resolve = async function (...args) {
            const context = args[2]
            if (!context || !context.user)
                throw new AuthenticationError('Not allowed')
            return resolve.apply(this, args)
        }
    }
}

module.exports = {
    typeDef,
    directive: IsAuth
}