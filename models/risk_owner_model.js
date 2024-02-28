const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let riskownerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true
    },

});

const Riskowner = mongoose.model('Riskowner', riskownerSchema);
module.exports = Riskowner;