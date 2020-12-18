const { gql } = require('apollo-server-express')

const typeDefs = gql`
    scalar Date

    extend type Query {
        getMyPost: [Post] @isAuth
        getPostByLimit(begin: Int! size: Int): [Post]
    }
    
    extend type Mutation {
        createPost(post: inputPost): Post @isAuth

        editPost(post: inputPost id: String!): Post @isAuth

        deletePost(id: String!): Boolean @isAuth

        addView(id: String!): Post

        likePost(id: String!): Post @isAuth
        savePost(id: String!): Boolean @isAuth

        createComment(
            comment: String!,
            post: String!
        ): Comment @isAuth

        editComment(
            comment: String!,
            id: String!
        ): Comment @isAuth

        deleteComment(post: String!, id: String!): Post @isAuth
    }

    input inputPost {
        title: String!
        text: String!
        content: String
    }

    type Post {
        id: ID
        title: String
        text: String
        content: File
        view: Int
        likes: [User]
        date: Date
        author: User
        comments: [Comment]
    }
    
    type Comment {
        id: ID
        text: String
        author: User
    }
`

const resolvers = require('./resolvers')
module.exports = {
    typeDefs: [
        typeDefs
    ],
    resolvers
}