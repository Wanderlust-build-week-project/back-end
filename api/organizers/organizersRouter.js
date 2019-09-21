const express = require('express');
const router = express.Router();
const Organizers = require('./organizersHelper');

router.get('/', (req, res) => {
    Organizers.getOrganizers()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.post('/', (req, res) => {
    const organizer = req.body;
    Organizers.addOrganizer(organizer)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Organizers.getOrganizerById(id)
    .then(organizer => {
        res.status(200).json(organizer)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/username/:username', (req, res) => {
    const username = req.params.username;
    Organizers.getOrganizerByUsername(username)
    .then(organizer => {
        res.status(200).json(organizer)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Organizers.deleteOrganizer(id)
    .then(result => {
        res.status(200).json({message: `Successfully deleted organizer with id ${id}`})
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const organizer = req.body;
    Organizers.updateOrganizer(id, organizer)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})
module.exports = router;