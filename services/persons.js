const Person = require('../models/Person');
const {
    v4: uuidv4,
} = require('uuid');
const moment = require('moment');

async function getPerson(username) {
    // Como o identificador é gerado de forma autonoma e não é passado para o usuário, para a busca de usuário preferi usar o username.
    const getPerson= await Person.findOne({
        username
    })
    return getPerson;
}

async function createPerson(payload) {
    const {
        name,
        username,
        birthdate,
        address,
        adressNumber,
        primaryPhone,
        description
    } = payload;

    if (!payload) {
        return 'Desculpe, preencha todos os campos necessários';
    }

    const person = new Person({
        uuid: uuidv4(),
        name,
        username,
        birthdate,
        address,
        adressNumber,
        primaryPhone,
        description,
        createdAt: moment().format('DD/MM/YYYY'),
    });

    const user = await Person.create(person);

    return user;
}

async function updatePerson(identifier, payload) {
    const {
        name,
        username,
        birthdate,
        address,
        adressNumber,
        primaryPhone,
        description
    } = payload;

    if (payload == 0) {
        return 'Desculpe, preencha ao menos um campo';
    }

    await Person.findOneAndUpdate({
        identifier
    }, {
        name,
        username,
        birthdate,
        address,
        adressNumber,
        primaryPhone,
        description,
    });

    const user = await Person.findOne({
        identifier
    });

    return user;

}

async function deletePerson(username) {
    const deletedPerson = await Person.findOneAndDelete({
        username
    });
    return 'Usuário Deletado com sucesso!';
}
module.exports = {
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
};