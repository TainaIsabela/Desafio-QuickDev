const router = require('express').Router();
const services = require('../services/persons');


router.get('/:username', async (req, res) => {
    const username = req.params.username;
    await services.getPerson(username).then(person => {
        res.json(person);
    }).catch(err => {
        res.json(err);
    });


});

router.post('/persons', async (req, res) => {
    const payload = req.body;
    await services.createPerson(payload).then(person => {
        res.json(person);
    }).catch(err => {
        res.json(err);
    });
})

router.put('/:username', async (req, res) => {
    const username = req.params.username;
    const payload = req.body;
    await services.updatePerson(username, payload).then(person => {
        res.json(person);
    }).catch(err => {
        res.json(err);
    });
})

router.delete('/:username', async (req, res) => {
    const username = req.params.username;
    await services.deletePerson(username).then(person => {
        res.json(person);
    }).catch(err => {
        res.json(err);
    });
})

module.exports = router;