require('dotenv').config({ path: '.env.production' });
const mongoose = require('mongoose');
const cron = require('node-cron');
const fetch = require('node-fetch');
const { PollutionLog } = require('./models');

//City coordinates
const LONGITUDE = '2.352222';
const LATITUDE = '48.856613';

//Connect to the database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true })
.then(() => {

    //Schedule cron job every minute
    cron.schedule('*/5 * * * * *', async () => {

        //Used parameters
        const query = `?key=${process.env.IQAIR_API_KEY}&lon=${LONGITUDE}&lat=${LATITUDE}`;
        const responseRaw = await fetch(process.env.IQAIR_DATA_ENDPOINT + query);
        const response = await responseRaw.json();

        //Check response
        if (response.status !== 'success') return;

        //Save data
        const pollution = response.data?.current?.pollution || {};
        const city = response.data?.city?.toLowerCase();
        const createdAt = new Date();

        try {

            await new PollutionLog({
                city, createdAt,
                ts: new Date(pollution.ts),
                aqius: pollution.aqius,
                mainus: pollution.mainus,
                aqicn: pollution.aqicn,
                maincn: pollution.maincn
            })
            .save();

            console.log('Log saved at: ' + createdAt.toUTCString());

        } catch (error) {
            console.error('Error: ' + error.message);
        }

    });

})
.catch((error) => {
    console.error('Database connection error: ' + error.message);
});
