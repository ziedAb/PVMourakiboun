const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');


const PVSchema = new Schema({
    office: {
        type: Number,
        required: [true, 'office field is required']
    },
    stamped: Boolean,
    filledBy: { type: Schema.Types.ObjectId, ref: 'User' },
    inserted: { type: Date, default: Date.now }
},
{ strict: false }
);

const PV = mongoose.model('PV', PVSchema);

module.exports = PV;
