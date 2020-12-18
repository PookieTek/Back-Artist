const { Post } = require('../../../models/Post')

const getMyPost = async(_, {}, {user}) => {
    const posts = await Post.find({author: user._id}, {}, {sort: {date: -1}})
    .populate('likes')
    .populate('author')
    .populate('content')
    .populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    })
    .exec()
    return posts
}

const getPostByLimit = async(_, {begin, size}) => {
    const posts = await Post.find({}, null, {skip: begin, limit: size, sort: {date: -1}})
    .populate('author')
    .populate('content')
    .populate('likes')
    .populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    })
    .exec()
    return posts
}

module.exports = {
    getMyPost,
    getPostByLimit
}