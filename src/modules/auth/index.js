const { gql } = require('apollo-server-express')

const typeDefs = gql`
    extend type Query {
        me: User @isAuth
        login(
            email: String!,
            password: String!
        ): Token
        ping: String
        getSaved: [Post] @isAuth
    }
    extend type Mutation {
        signup(
            email: String!,
            password: String!,
            firstname: String,
            lastname: String
        ): User
        deleteMe: Boolean @isAuth
    }

    type User {
        id: ID
        email: String
        firstname: String
        lastname: String
        savedpost: [Post]
    }

    type Token {
        user: User
        token: String!
    }
`

const resolvers = require('./resolvers')
module.exports = {
    typeDefs: [
        typeDefs
    ],
    resolvers
}