const express = require('express');
const router = express.Router();
const GE = require('./guestExperiencesHelpers');
const { validateGuestExperience, validateGuestExperienceForDelete} = require('../middleware')

router.get('/', (req, res) => {
    GE.getGuestExperiences()
        .then(experiences => {
            res.status(200).json(experiences)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})


router.post('/guestexperiences', validateGuestExperience, (req, res) => {
    const guest_experience = req.body;
    console.log(req.body)
    GE.addGuestExperience(guest_experience)
        .then(newGuestExperience => {
            res.status(201).json(newGuestExperience)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.put('/:guest_id/:experience_id', validateGuestExperience, (req, res) => {
    console.log(req.body)
    const updated_experience = req.body;
    const guest_id = req.params.guest_id;
    const experience_id = req.params.experience_id;

    GE.updateGuestExperience(guest_id, experience_id, updated_experience)
        .then(updatedExperience => {
            res.status(200).json(updatedExperience)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})

router.delete('/:guest_id/:experience_id', validateGuestExperienceForDelete, (req, res) => {
    const guest_id = req.params.guest_id;
    const experience_id = req.params.experience_id;
    GE.deleteGuestExperience(guest_id, experience_id)
    .then(result => {
        res.status(200).json({message: `Successfully deleted guest experience at guest_id ${guest_id}, and experience_id ${experience_id}`})
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

module.exports = router;