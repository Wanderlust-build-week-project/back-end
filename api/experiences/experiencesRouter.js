const express = require('express');
const router = express.Router();
const Experiences = require('./experiencesHelper');
const { 
    validateGuestId,
    validateExperienceType, 
    validateGuestExperience, 
    validateExperienceId, 
    validateGuestUsername, 
    validateLocationId, 
    validateLocationName, 
    validateOrganizerId, 
    validateOrganizerUsername, 
    validateTypeId, 
    validateTypeName, 
    validateNewExperience
} = require('../middleware');

router.get('/', (req, res) => {
    Experiences.getExperiences()
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})
router.get('/experience/:id', validateExperienceId, (req, res) => {
    const id = req.params.id;
    Experiences.getExperienceById(id)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/location/:id', validateLocationId, (req, res) => {
    const id = req.params.id;
    Experiences.getExperiencesByLocationId(id)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/location/name/:location', validateLocationName, (req, res) => {
    const location = req.params.location;
    Experiences.getExperiencesByLocation(location)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/organizer/:id', validateOrganizerId, (req, res) => {
    const id = req.params.id;
    Experiences.getExperiencesByOrganizerId(id)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/organizer/name/:username', validateOrganizerUsername, (req, res) => {
    const username = req.params.username;
    Experiences.getExperiencesByOrganizer(username)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/type/:id', validateTypeId, (req, res) => {
    const id = req.params.id;
    Experiences.getExperiencesByTypeId(id)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/type/name/:type', validateTypeName, (req, res) => {
    const type = req.params.type;
    Experiences.getExperiencesByType(type)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})


router.post('/', validateNewExperience, (req, res) => {
    const experience = req.body;
    Experiences.addExperience(experience)
        .then(newExperience => {
            res.status(201).json(newExperience)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.put('/experience/:id', validateExperienceId, (req, res) => {
    const id = req.params.id;
    const experience = req.body;
    Experiences.updateExperience(id, experience)
        .then(updatedExperience => {
            res.status(200).json(updatedExperience)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.delete('/experience/:id', validateExperienceId, (req, res) => {
    const id = req.params.id;
    Experiences.deleteExperience(id)
        .then(result => {
            res.status(200).json({ message: `You have successfully deleted experience at id ${id}` })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})
//experience Types
router.get('/experienceTypes', (req, res) => {
    Experiences.getExperienceTypes()
        .then(experienceTypes => {
            res.status(200).json(experienceTypes)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.post('/experienceType', validateExperienceType, (req, res) => {
    const experiencetype = req.body
    Experiences.addExperienceType(experiencetype)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})


//guest experiences
router.get('/guestExperiences', (req, res) => {
    Experiences.getGuestExperiences()
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/guestExperiences/:id', validateGuestId, (req, res) => {
    const guest_id = req.params.id;
    Experiences.getExperiencesByGuestId(guest_id)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.get('/guestExperiences/name/:username', validateGuestUsername, (req, res) => {
    const username = req.params.username;
    Experiences.getExperiencesByGuest(username)
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.post('/guestExperiences', validateGuestExperience, (req, res) => {
    const guest_experience = req.body;
    console.log(req.body)
    Experiences.addGuestExperience(guest_experience)
        .then(newGuestExperience => {
            res.status(201).json(newGuestExperience)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.put('/guestExperiences/:guest_id/:experience_id', validateGuestExperience, (req, res) => {
    console.log(req.body)
    const updated_experience = req.body;
    const guest_id = req.params.guest_id;
    const experience_id = req.params.experience_id;

    Experiences.updateGuestExperience(guest_id, experience_id, updated_experience)
        .then(updatedExperience => {
            res.status(200).json(updatedExperience)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})
module.exports = router;