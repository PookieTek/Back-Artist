const File = require('../../../models/File')

const getMyFiles = async(_, {}, { user }) => {
    const files = await File.find({owner: user.id}).populate('owner').exec()
    return files
}

module.exports = getMyFiles