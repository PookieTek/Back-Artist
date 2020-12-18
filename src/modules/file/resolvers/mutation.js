const File = require('../../../models/File')
const config = require('../../../config')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:config.CLOUDNAME,
    api_key:config.CLOUDAPI,
    api_secret:config.CLOUDSECRET
})

const storeFile = async (file) => {
    const { createReadStream, filename, mimetype } = await file;
    var type = mimetype.split("/")
    if ((type[0] != "video" && type[0] != "image" && type[0] != "audio"))
        throw new Error("Invalid format")
    const result = await new Promise((resolve, reject) => {
    createReadStream().pipe(
        cloudinary.uploader.upload_stream({resource_type: "raw"}, (error, result) => {
            if (error)
                reject(error)
            resolve(result)
        })
    )})
    const data = {
        filename: filename,
        mimetype: mimetype,
        path: result.secure_url
    }
    return data
}

const upload = async(_, { file }, { user }) => {
    const data = await storeFile(file)
    const result = await File.create({
        path: data.path,
        name: data.filename,
        type: data.mimetype,
        owner: user._id
    });
    return result
}

module.exports = upload