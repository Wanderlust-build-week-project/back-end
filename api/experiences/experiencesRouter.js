const express = require('express');
const router = express.Router();
const Experiences = require('./experiencesHelper');

router.get('/', (req, res) => {
    Experiences.getExperiences()
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/location/:locationid', (req, res) => {
    const id = req.params.locationid;
    Experiences.getExperiencesByLocation(id)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/organizer/:organizerid', (req, res) => {
    const id = req.params.organizerid;
    Experiences.getExperiencesByOrganizer(id)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/type/:type', (req, res) => {
    const type = req.params.type;
    Experiences.getExperiencesByType(type)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.post('/experienceType', (req, res) => {
    const experiencetype = req.body
    Experiences.addExperienceType(experiencetype)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.post('/', (req, res) => {
    const experience = req.body;
    Experiences.addExperience(experience)
    .then(newExperience => {
        res.status(201).json(newExperience)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})


module.exports = router;