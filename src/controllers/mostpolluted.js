const ErrorHandler = require('../utils/errorhandler');

module.exports = ErrorHandler(async (req, res) => {

    //Get parameters
    const {  } = req.query;

    //Send data
    res.json({ source: '/mostpolluted' });

});
