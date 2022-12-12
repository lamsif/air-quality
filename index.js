require('dotenv').config({ path: process.env.APP_ENV === 'development' ? '.env.development' : '.env.production' });
const mongoose = require('mongoose');
const app = require('./src/app');

async function main() {

    //Connect to the database
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true });
    console.log('Database connected.');

    //Run server
    const port = process.env.PORT;
    app.listen(port, () => console.log(`API running on port ${port}.`));

}

main().catch((error) => console.error('Error: ' + error.message));
