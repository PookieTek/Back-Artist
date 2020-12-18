const { UserInputError } = require('apollo-server-express')
const User = require('../../../models/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const config = require('../../../config')
const {Post, Comment} = require('../../../models/Post')
const File = require('../../../models/File')

const trans = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.CONTACT_MAIL,
        pass: config.CONTACT_PSWD
    }
})

const signup = async (_, {
    email,
    password, 
    firstname, 
    lastname
}) => {
    try {
        const checkUser = await User.findOne({"email": email})
        var code = Math.round(Math.random() * (9999 - 1111) + 1111)
        if (checkUser)
            throw new UserInputError("Already Exist")
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({
            email: email,
            password: hash,
            firstname: firstname,
            lastname: lastname,
            active: false,
            code: code
        })
        const mailOpt = {
            from: config.CONTACT_MAIL,
            to: email,
            subject: "Confirm your Email !",
            html: `Please, click on the <a href="http://${config.DNS_ADDRESS}/verify/${code}">link<a/> to confirm your email.
            <br>If the link is invalid, 
            you can copy paste this link in your browser : ${config.DNS_ADDRESS}/verify/${code}`
        }
        trans.sendMail(mailOpt)
        return {
            ...user._doc,
            id: user._id,
            hash: null
        }
    } catch (err) {
        throw err
    }
}

const deleteMe = async(_, {}, { user }) => {
    var check = await Post.deleteMany({author: user.id})
    if (!check) {
        return false;
    }
    check = await File.deleteMany({owner: user.id})
    if (!check) {
        return false;
    }
    check = await Comment.deleteMany({author: user.id})
    if (!check)
        return false;
    check = await User.deleteOne({email: user.email})
    if (!check) {
        return false;
    }
    return true;
}

module.exports = {
    signup,
    deleteMe
}