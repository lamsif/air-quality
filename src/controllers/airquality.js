const fetch = require('node-fetch');
const ErrorHandler = require('../utils/errorhandler');

module.exports = ErrorHandler(async (req, res) => {

    //Get parameters
    const { longitude, latitude } = req.query;

    //Check parameters
    if (!longitude || !latitude) throw new Error('Params missing');

    //Used parameters
    const query = `?key=${process.env.IQAIR_API_KEY}&lon=${longitude}&lat=${latitude}`;
    const responseRaw = await fetch(process.env.IQAIR_DATA_ENDPOINT + query);
    const response = await responseRaw.json();

    //Check reposonse
    if (response.status !== 'success') throw new Error('An unexpected error occurred, please try again');

    //Send data
    res.json({ Result: { Pollution: response.data?.current?.pollution } });

});
