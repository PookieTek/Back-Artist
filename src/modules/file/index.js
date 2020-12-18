const { gql } = require('apollo-server-express')

const typeDefs = gql`
    scalar Upload

    extend type Query {
        getMyFiles: [File] @isAuth
    }
    extend type Mutation {
        upload(file: Upload!) : File @isAuth
    }

    type File {
        id: ID,
        owner: User,
        filename: String,
        type: String,
        path: String
    }
`
const resolvers = require('./resolvers')
module.exports = {
    typeDefs: [
        typeDefs
    ],
    resolvers
}