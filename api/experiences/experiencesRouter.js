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
    Experiences.getExperiencesByLocationId(id)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})
router.get('/location/name/:location', (req, res) => {
    const location = req.params.location;
    Experiences.getExperiencesByLocation(location)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/organizer/:organizerid', (req, res) => {
    const id = req.params.organizerid;
    Experiences.getExperiencesByOrganizerId(id)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/organizer/name/:username', (req, res) => {
    const username = req.params.username;
    Experiences.getExperiencesByOrganizer(username)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/type/:typeid', (req, res) => {
    const id = req.params.typeid;
    Experiences.getExperiencesByTypeId(id)
    .then(experiences => {
        res.status(200).json(experiences)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.get('/type/name/:type', (req, res) => {
    const type = req.params.type;
    Experiences.getExperiencesByType(type)
    .then(experiences => {
        res.status(200).json(experiences)
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

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const experience = req.body;
    Experiences.updateExperience(id, experience)
    .then(updatedExperience => {
        res.status(200).json(updatedExperience)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Experiences.deleteExperience(id)
    .then(result => {
        res.status(200).json({message: `You have successfully deleted experience at id ${id}`})
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})
//experience Types
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

router.get('/experienceTypes', (req, res) => {
    Experiences.getExperienceTypes()
    .then(experienceTypes => {
        res.status(200).json(experienceTypes)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})


module.exports = router;