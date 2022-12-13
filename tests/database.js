const mongoose = require('mongoose');

async function setupDatabase () {

    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true });

}

function closeDatabase () {

    mongoose.connection.close();

}

module.exports = {
    setupDatabase,
    closeDatabase
}
