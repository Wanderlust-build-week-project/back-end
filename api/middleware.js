const Organizers = require("./organizers/organizersHelper");
const Guests = require("./guests/guestsHelper");
const Experiences = require("./experiences/experiencesHelper");
const Locations = require("./locations/locationsHelper");
const Types = require("./types/typesHelper");

module.exports = {
  validateGuestId,
  validateGuestUsername,
  validateOrganizerId,
  validateOrganizerUsername,
  validateLocation,
  validateType,
  validateNewExperience,
  validateExperienceId,
  validateLocationId,
  validateLocationName,
  validateTypeId,
  validateTypeName,
  validateGuestExperience,
  validateExperienceType,
  validateGuestExperienceForDelete
};

function validateGuestId(req, res, next) {
  let id = req.params.id;

  Guests.getGuestById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid guest ID" });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateGuestUsername(req, res, next) {
  let username = req.params.username;
  Guests.getGuestByUsername(username)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid guest username." });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateOrganizerId(req, res, next) {
  let id = req.params.id;
  Organizers.getOrganizerById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid organizer ID" });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateOrganizerUsername(req, res, next) {
  let username = req.params.username;
  Organizers.getOrganizerByUsername(username)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid organizer username." });
      }
    })
    .catch(err => res.status(500).json(err));
}

function validateLocation(req, res, next) {
  let { location } = req.body;
  if (location) {
    next();
  } else {
    res.status(400).json({
      message: "Locations require a valid string for the location property."
    });
  }
}

function validateLocationId(req, res, next) {
  const id = req.params.id;
  Locations.getLocationById(id)
  .then(location => {
    if(location) {
      next()
    } else {
      res.status(400).json({message: 'Please provide a valid location id'})
    }
  })
}

function validateLocationName(req, res, next) {
  const location = req.params.location;
  Locations.getLocationByName(location)
  .then(result => {
    if(result) {
      next()
    } else {
      res.status(400).json({message: 'Please provide a valid location name'})
    }
  })
}

function validateType(req, res, next) {
  let { type } = req.body;
  if (type) {
    next();
  } else {
    res.status(400).json({
      message: "Types require a valid string for the type property."
    });
  }
}

function validateTypeId(req, res, next) {
  const id = req.params.id;
  Types.getTypeById(id)
  .then(type => {
    if(type) {
      next()
    } else{
      res.status(400).json({message: 'Please provide a valid type id'})
    }
  })
}

function validateTypeName(req, res, next) {
  const type = req.params.type;
  Types.getTypeByType(type).then(returnedType => {
    if(returnedType) {
      next()
    } else{
      res.status(400).json({message: 'Please provide a valid type'})
    }
  })
}

function validateNewExperience(req, res, next) {
  let experience = req.body;
  Organizers.getOrganizerById(experience.organizer_id)
    .then(organizer => {
      if (organizer) {
        Locations.getLocationById(experience.location_id).then(location => {
          if (location) {
            if (experience.name) {
              if (experience.duration) {
                next()
              } else {
                res.status(400).json({ message: 'Please provide a duration in hours' })
              }
            } else {
              res.status(400).json({ message: 'Please provide an experience name' })
            }
          } else {
            res.status(400).json({ message: 'Please provide a valid location_id' })
          }
        })
      } else {
        res.status(400).json({ message: 'Please provide a valid organizer_id' })
      }
    })
}

function validateExperienceId(req, res, next) {
  const id = req.params.id;
  Experiences.getExperienceById(id)
  .then(experience => {
    if(experience) {
      next()
    }else {
      res.status(400).json({message: 'Please provide a valid experience id'})
    }
  })
}

function validateGuestExperience(req, res, next) {
  guest_experience = req.body;
  Experiences.getExperienceById(guest_experience.experience_id)
  .then(experience => {
    if(experience) {
      Guests.getGuestById(guest_experience.guest_id).then(guest => {
        if(guest) {
          next()
        } else {
          res.status(400).json({message: 'Please provide a valid guest_id'})
        }
      })
    } else {
      res.status(400).json({message: 'Please provide a valide experience_id'})
    }
  })
}

function validateGuestExperienceForDelete(req, res, next) {
  const guest_id = req.params.guest_id;
  const experience_id = req.params.experience_id;
  Experiences.getGuestExperienceByIds(guest_id, experience_id)
  .then(guestExperience => {
    if(guestExperience) {
      next()
    } else{
      res.status(400).json({message: 'Please provide a valid guest_id and experience_id'})
    }
  })
}

function validateExperienceType(req, res, next) {
  const experience_type = req.body;
  Types.getTypeById(experience_type.type_id)
  .then(type =>{
    if(type) {
      Experiences.getExperienceById(experience_type.experience_id)
      .then(experience => {
        if(experience) {
          next();
        } else {
          res.status(400).json({message: 'Please provide a valid experience_id'})
        }
      })
    } else {
      res.status(400).json({message: 'Please provide a valid type_id'})
    }
  })
}