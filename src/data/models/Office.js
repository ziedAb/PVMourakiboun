const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema & model
const OfficeSchema = new Schema({
    circonscription: {
        type: String,
        required: [true, 'Circonscription field is required']
    },
    delegation: String,
    number: Number,
    station_name: String,
    center_name: String,
    filled: Number,
    error: Boolean,
    tocorrect: Boolean
});

const Office = mongoose.model('Office', OfficeSchema);

module.exports = Office;
