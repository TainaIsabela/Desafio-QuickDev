const assert = require('assert');
const service = require('../services/persons');
const mongoose = require("mongoose");

const user = {
    name: 'Genevieve Coffey',
    username: 'geniCoffey',
    birthdate: '22/05/1966',
    address: '1368 Bottom Lane',
    adressNumber: '14224',
    primaryPhone: '716-674-6459',
    description: 'Lorem ipsum eleifend elementum, blandit. '
};
const updateUser = {
    name: 'Genevieve Coffey',
    username: 'geniCoffey',
    birthdate: '22/05/1986',
    address: '1368 Bottom Lane',
    adressNumber: '14224',
    primaryPhone: '716-674-6459',
    description: 'Lorem ipsum eleifend elementum, blandit. '
};


describe('Testes CRUD - Users', async function () {

    this.beforeAll(async () => {

        mongoose.connect('mongodb+srv://admin:quickdev@quickdev.tu0s5.mongodb.net/Quickdev-Desafio?retryWrites=true&w=majority')
            .then(() => {
                mongoose.connection.db.dropDatabase();
                console.log('Conectado ao MongoDB');
            })
            .catch(err => {
                console.log(err);
            });
    });

    this.afterAll(async () => {
        await mongoose.disconnect();
    });

    it('should create a user', async function () {
        const userService = await service.createPerson(user)
        assert.equal(userService.name, user.name);
        assert.equal(userService.username, user.username);
        assert.equal(userService.birthdate, user.birthdate);
        assert.equal(userService.address, user.address);
        assert.equal(userService.adressNumber, user.adressNumber);
        assert.equal(userService.primaryPhone, user.primaryPhone);
        assert.equal(userService.description, user.description);
    })

    it('should get a user', async function () {
        const userService = await service.getPerson(user.username)
        assert.equal(userService.name, user.name);
        assert.equal(userService.username, user.username);
        assert.equal(userService.birthdate, user.birthdate);
        assert.equal(userService.address, user.address);
        assert.equal(userService.primaryPhone, user.primaryPhone);
        assert.equal(userService.description, user.description);

    })

    it('should update a user', async function () {
        const userService = await service.updatePerson(user.username, updateUser);
        assert.equal(userService.name, updateUser.name);
        assert.equal(userService.username, updateUser.username);
        assert.equal(userService.birthdate, updateUser.birthdate);
        assert.equal(userService.address, updateUser.address);
        assert.equal(userService.adressNumber, updateUser.adressNumber);
        assert.equal(userService.primaryPhone, updateUser.primaryPhone);
        assert.equal(userService.description, updateUser.description);
    })

    it('should deleted a user', async function () {
        const userService = await service.deletePerson(user.username);
        // console.log(userService);
        assert.equal(userService, 'Usuário Deletado com sucesso!');
        
    })

});