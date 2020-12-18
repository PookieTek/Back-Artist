const { makeExecutableSchemaFromModules } = require('../utils/modules')

const auth = require('./auth')
const file = require('./file')
const post = require('./post')

module.exports = makeExecutableSchemaFromModules({
    modules: [
        auth,
        file,
        post
    ]
})