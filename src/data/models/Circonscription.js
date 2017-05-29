const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var partySchema = new Schema({
    name: String,
    number: Number
});

const CirconscriptionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },
    circ: Number,
    parties:[partySchema]
});

const Circonscription = mongoose.model('Circonscription', CirconscriptionSchema);

module.exports = Circonscription;
