const db = require('../../data/dbConfig');

module.exports = {
    getExperiences,
    getExperiencesByOrganizer,
    addExperience,
    getExperienceById,
    getExperiencesByLocationId,
    getExperiencesByGuest,
    getExperiencesByGuestId,
    getExperiencesByType,
    addExperienceType,
    getExperienceTypes,
    getExperiencesByLocation,
    getExperiencesByTypeId,
    getExperiencesByOrganizerId,
    updateExperience,
    deleteExperience,
    addGuestExperience,
    getGuestExperiences,
    updateGuestExperience
}

function getExperiences() {
    return db('experiences').then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true;
            } else {
                experience.completed = false;
            }
            return experience;
        })})
}

function getExperienceById(id) {
    return db('experiences').where({id}).first().then(experience => {
        if(experience.completed === 1) {
            experience.completed = true;
        } else {
            experience.completed = false;
        }
        return experience;
    })
}

function getExperiencesByOrganizer(username) {
    return db('experiences as e').join('organizers as o', 'e.organizer_id', 'o.id').where({username}).select('e.*','o.username').then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true
            } else {
                experience.completed = false;
            }

            return experience;
        })
    })
}

function getExperiencesByOrganizerId(organizer_id) {
    return db('experiences as e').join('organizers as o', 'e.organizer_id', 'o.id').select('e.*', 'o.username').where({organizer_id}).then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true
            } else {
                experience.completed = false;
            }

            return experience;
        })
    })
}



function getExperiencesByLocationId(location_id) {
    return db('experiences').join('locations as l', 'experiences.location_id', 'l.id').select('l.id as location_id','l.location', 'e.*').where({location_id}).then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true
            } else {
                experience.completed = false;
            }

            return experience;
        })
    })
}

function getExperiencesByLocation(location) {
    return db('experiences').join('locations as l', 'experiences.location_id', 'l.id').where({location}).then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true
            } else {
                experience.completed = false;
            }

            return experience;
        })
    })
}

function getExperiencesByType(type) {
    return db('types as t').join('experience_types as et', 't.id', 'et.type_id').join('experiences as e','et.experience_id', 'e.id').select('t.type','e.*').where({type}).then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true
            } else {
                experience.completed = false;
            }

            return experience;
        })
    })
}

function getExperiencesByTypeId(id) {
    return db('types as t').join('experience_types as et', 't.id', 'et.type_id').join('experiences as e','et.experience_id', 'e.id').select('t.id as typeid','t.type','e.*').where({type_id: id}).then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true
            } else {
                experience.completed = false;
            }

            return experience;
        })
    })
}



function addExperience(experience) {
    return db('experiences').insert(experience).then(res => {
        return getExperienceById(res[0])
    })
}

function updateExperience(id, experience){
    return db('experiences').update(experience).where({id}).then(updatedExperience => {
        return getExperienceById(id)
    })
}

function deleteExperience(id) {
    return db('experiences').where({id}).del().then(result => result)
}

function addExperienceType(experienceType){
    return db('experience_types').insert(experienceType).then(result => result)
}

function getExperienceTypes() {
    return db('experience_types').then(et => et)
}

function addGuestExperience(guestExperience) {
    return db('guest_experiences').insert(guestExperience).then(result => result)
}
function updateGuestExperience(guest_id, experience_id, updated_experience){
    return db('guest_experiences').update(updated_experience).where({guest_id: guest_id, experience_id: experience_id})
}
function getGuestExperiences() {
    return db('guest_experiences').then(guest_experiences => guest_experiences);
}

function getExperiencesByGuestId(guest_id) {
    return db('guest_experiences as ge').join('experiences as e', 'ge.experience_id', 'e.id').join('guests as g', 'g.id', 'ge.guest_id').select('g.username', 'e.*').where({guest_id}).then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true;
            } else {
                experience.completed = false;
            }

            if(experience.favorited === 1) {
                experience.favorited = true;
            } else {
                experience.favorited = false;
            }

        return experience;
        })
    })
}

function getExperiencesByGuest(username) {
    return db('guests as g').join('guest_experiences as ge', 'g.id', 'ge.guest_id').join('experiences as e', 'ge.experience_id', 'e.id').select('e.*', 'ge.*', 'g.username').where({username}).then(experiences => {
        return experiences.map(experience => {
            if(experience.completed === 1) {
                experience.completed = true;
            } else {
                experience.completed = false;
            }

            if(experience.favorited === 1) {
                experience.favorited = true;
            } else {
                experience.favorited = false;
            }

        return experience;
        })
    })
}