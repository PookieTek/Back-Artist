const mongoose = require('mongoose');;
const app = require('./app');
const config = require('./config');

const runApp = async function () {
    const mongooseOpt = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        promiseLibrary: global.Promise,
        useFindAndModify: false
    };

    try {
        await Promise.all([
            mongoose.connect(config.MONGODB_URL, mongooseOpt),
            app.listen(config.PORT)
        ]);
        console.log(`Start on port ${config.PORT}`)
    } catch (err) {
        console.error("Error start :", err)
    }
}

runApp();