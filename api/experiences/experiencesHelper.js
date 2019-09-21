const db = require('../../data/dbConfig');

module.exports = {
    getExperiences,
    getExperiencesByOrganizer,
    addExperience,
    getExperinceById,
    getExperiencesByLocation,
    getExperiencesByGuest,
    getExperiencesByType,
    addExperienceType
}

function getExperiences() {
    return db('experiences').then(experiences => experiences)
}


function getExperiencesByOrganizer(organizer_id) {
    return db('experiences').where({organizer_id}).then(experiences => experiences)
}

function getExperiencesByGuest(guest_id) {
    return db('guest_experiences as ge').join('experiences as e', 'g.experience_id', 'e.id').where({guest_id}).then(experiences => experiences)
}

function getExperiencesByLocation(location_id) {
    return db('experiences').join('locations as l', 'experiences.location_id', 'l.id').where({location_id}).then(experience => experience)
}
function getExperiencesByType(type) {
    return db('types as t').join('experiences as e', 't.experience_id', 'e.id').where({type}).then(experiences => experiences)
}
function getExperinceById(id) {
    return db('experiences').where({id}).first().then(experience => experience)
}
function addExperience(experience) {
    return db('experiences').insert(experience).then(res => {
        return getExperinceById(res[0])
    })
}

function addExperienceType(experienceType){
    return db('experience_types').insert(experienceType).then(result => result)
}