const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    id: String,
    name: String,
    username: String,
    birthday: String,
    address: String,
    adressNumber: String,
    primaryPhone: String,
    description: String,
    createdAt: String,
});

module.exports = Person;