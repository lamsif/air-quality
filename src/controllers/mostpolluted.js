const ErrorHandler = require('../utils/errorhandler');
const { PollutionLog } = require('../models');

module.exports = ErrorHandler(async (req, res) => {

    //Get parameters
    const { city } = req.query;

    //Check parameters
    if (!city) throw new Error('City parameter missing');

    //Used parameters
    const usedCity = city.toLowerCase();

    //Query data
    const response = await PollutionLog.findOne({ city: usedCity }).sort({ aqius: -1 });

    //Check data
    if (!response) throw new Error('City data not found');

    //Send response
    res.json({ MostPollutedDate: response.createdAt.toUTCString() });

});
