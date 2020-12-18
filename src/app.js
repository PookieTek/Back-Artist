const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUpload } = require('graphql-upload');
const schema = require('./modules');
const context = require('./utils/ctx');
const User = require('./models/User');

const server = new ApolloServer({
    schema,
    graphiql: true,
    context: async ({ req }) => ({
        user: await context.getUser(req)
    }),
});
const app = express(graphqlUpload);
app.get(
    '/verify/:token', (req, res) => {
        token = req.params.token
        User.updateOne(
            {code: token}, {
                $set: {active: true},
                $unset: {code: 0}
            }, (err, data) => {
                res.status(200)
                res.json({})
            }
        )
    }
)

server.applyMiddleware({
    path: '/graphql',
    app
});
module.exports = app;