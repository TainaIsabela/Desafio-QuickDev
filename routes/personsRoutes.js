const Person = require('../models/Person');
const router = require('express').Router();
const { 
    v4: uuidv4,
  } = require('uuid');
const moment = require('moment');

 
// Como o identificador é gerado de forma autonoma e não é passado para o usuário, para a busca de usuário preferi usar o username.
router.get('/:username', (req, res) => {
    Person.findOne({ username: req.params.username }, (err, data) => {
        if (err) {
            return res.send(err);
        }
        return res.send(data);
    });
});

router.post('/person', async (req, res) => {
    const { name, username, birthdate, address, addressNumber, primaryPhone, description } = req.body;

    if(!req.body.name || !req.body.username || !req.body.birthdate || !req.body.address || !req.body.addressNumber || !req.body.primaryPhone || !req.body.description) {
        return res.status(400).send({ error: 'Desculpe, preencha todos os campos necessários' });
    }

    const person = new Person({
        uuid: uuidv4(),
        name,
        username,
        birthdate,
        address,
        addressNumber,
        primaryPhone,
        description,
        createdAt: moment().format('DD/MM/YYYY'),
    });
    try {
        await Person.create(person);
        res.status(200).json({
            message: 'usuário criado com sucesso'
        });
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
});

router.put('/:username', (req, res) => {
    const { name, username, birthdate, address, addressNumber, primaryPhone, description } = req.body;

    if(req.body.length == 0) {
        return res.status(400).send({ error: 'Desculpe, preencha ao menos um campo' });
    }

    Person.findOneAndUpdate({ username: req.params.username }, {
        name,
        username,
        birthdate,
        address,
        addressNumber,
        primaryPhone,
        description,
    }, { new: true }, (err, data) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json({
            message: 'usuário atualizado com sucesso'
        });
    });
});

router.delete('/:username', (req, res) => {
    Person.findOneAndDelete({ username: req.params.username }, (err, data) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json({message: 'Usuário deletado com sucesso!'});
    });
});

module.exports = router;