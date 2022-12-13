const { model, Schema } = require('mongoose');

exports.PollutionLog = model('PollutionLog', new Schema({

    city: { type: String, required: true },
    createdAt: { type: Date, required: true },
    ts: { type: Date, required: true },
    aqius: { type: Number, required: true },
    mainus: { type: String, required: true },
    aqicn: { type: Number, required: true },
    maincn: { type: String, required: true }

}));
