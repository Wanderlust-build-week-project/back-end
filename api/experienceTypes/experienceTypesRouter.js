const express = require('express');

const router = express.Router();
const ET = require('./experienceTypesHelpers');
const {validateExperienceType} = require('../middleware');
router.get('/', (req, res) => {
    ET.getExperienceTypes()
        .then(experienceTypes => {
            res.status(200).json(experienceTypes)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.post('/', validateExperienceType, (req, res) => {
    const experiencetype = req.body
    ET.addExperienceType(experiencetype)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
})

router.delete('/:typeid/:experienceid', (req, res) => {
    const type_id = req.params.typeid;
    const experience_id = req.params.experienceid;
    ET.deleteExperienceType(type_id, experience_id)
    .then(result => {
        res.status(200).json({message: `Successfully deleted experience type at type_id ${type_id} and experience_id ${experience_id}`})
    })
    .catch(err => {
        res.status(500).json({error: err})
    })

})
module.exports = router;