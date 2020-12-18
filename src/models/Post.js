const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'files'
    },
    view: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
}, {
    collection: 'posts'
})

const Post = mongoose.model('posts', postSchema, 'posts')
const Comment = mongoose.model('comments', commentSchema, 'comments')
module.exports = {
    Post,
    Comment
}