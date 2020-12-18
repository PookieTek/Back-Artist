const { getMyPost, getPostByLimit } = require('./query')
const { 
    createPost, 
    editPost, 
    deletePost, 
    addView, 
    likePost, 
    savePost, 
    createComment, 
    editComment, 
    deleteComment 
} = require('./mutation')


const resolvers = {
    Query: {
        getMyPost,
        getPostByLimit
    },
    Mutation: {
        createPost,
        editPost,
        deletePost,
        addView,
        likePost,
        savePost,
        createComment,
        editComment,
        deleteComment
    }
}

module.exports = resolvers