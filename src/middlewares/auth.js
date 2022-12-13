
module.exports = (req, res, next) => {

    //Get parameters
    const { key } = req.query;

    //Check key
    if (!key) next(new Error('API key missing'));
    else if (key !== process.env.API_KEY) next(new Error('Invalid API key'));
    else next();

};
