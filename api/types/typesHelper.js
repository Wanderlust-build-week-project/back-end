const db = require('../../data/dbConfig');

module.exports = {
    getTypes,
    getTypeById,
    getTypeByType,
    updateType,
    deleteType,
    addType
}


function getTypes() {
    return db('types').then(types => types)
}

function getTypeById(id) {
    return db('types').where({id}).first().then(type => type)
}

function getTypeByType(type) {
    return db('types').where({type}).first().then(result => result)
}

function addType(type){
    return db('types').insert(type).then(result => {
        return getTypeByType(type.type).then(newType => newType)
    })
}

function updateType(id, type){
    return db('types').where({id}).update(type).then(result => {
        return getTypeByType(type.type).then(updatedType => updatedType)
    })
}

function deleteType(id) {
    return db('types').where({id}).del().then(result => result)
}