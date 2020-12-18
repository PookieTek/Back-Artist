const { Post, Comment } = require('../../../models/Post')
const User = require('../../../models/User')

const createPost = async(_, { post }, { user }) => {
    const result = await Post.create({
        title: post.title,
        text: post.text,
        content: post.content,
        view: 0,
        author: user._id
    })
    return result
}

const editPost = async(_, { id, post }) => {
    const uppost = await Post.findOneAndUpdate({_id: id}, {
        $set : {
            title: post.title,
            text: post.text,
            content: post.content,
            date: Date.now()
        }
    }, {new: true})
    return uppost
}

const deletePost = async(_, { id }, { user }) => {
    const check = await Post.findOneAndDelete({_id: id, author: user._id})
    if (check)
        return true
    return false
}

const addView = async(_, { id} ) => {
    const post = await Post.findOneAndUpdate({_id: id}, {
        $inc: { view: 1}
    }, {new: true})
    return post
}

const likePost = async(_, { id }, {user}) => {
    var check = await Post.findOne({_id: id})
    if (check.likes.indexOf(user.id) != -1)
        check = await Post.findOneAndUpdate({_id: id}, {
            $pull: {likes: user.id}
        }, {new: true}).populate('likes')
    else
        check = await Post.findOneAndUpdate({_id: id}, {
            $push: {likes: user.id}
        }, {new: true}).populate('likes')
    return check
}

const savePost = async(_, {id}, {user}) => {
    var check = await User.findOne({_id: user._id})
    if (check.savedpost.indexOf(id) != -1)
        check = await User.findOneAndUpdate({_id: user._id}, {
            $pull: {savedpost: id}
        }, {new: true})
    else
        check = await User.findOneAndUpdate({_id: user.id}, {
            $push: {savedpost: id}
        }, {new: true})
    if (check)
        return true
    return false
}

const createComment = async(_, {comment, post}, {user}) => {
    const coms = await Comment.create({
        text: comment,
        author: user._id
    })
    await Post.findByIdAndUpdate({_id: post}, {
            $push:  {comments: coms._id}
    })
    return coms
}

const editComment = async(_, {comment, id}, {user}) => {
    const post = await Comment.findOneAndUpdate({_id: id, author: user._id}, {
        $set: {
            text: comment
        }
    }, {new: true})
    return post
}

const deleteComment = async(_, {post, id}, {user}) => {
    const result = await Post.findOneAndUpdate({_id: post}, {
        $pull: {
            comments: id,
        }
    }, {new: true})
    await Comment.findOneAndDelete({_id: id, author: user.id})
    return result
}

module.exports = {
    createComment,
    editComment,
    deleteComment,
    createPost,
    editPost,
    deletePost,
    addView,
    likePost,
    savePost
}