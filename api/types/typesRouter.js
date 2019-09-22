const express = require("express");
const router = express.Router();
const Types = require("./typesHelper");
const { validateType } = require("../middleware");

router.get("/", (req, res) => {
  Types.getTypes()
    .then(types => {
      res.status(200).json(types);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Types.getTypeById(id)
    .then(type => {
      res.status(200).json(type);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get("/type/:type", (req, res) => {
  const type = req.params.type;
  Types.getTypeByType(type).then(result => {
    res.status(200).json(result);
  });
});

router.post("/", validateType, (req, res) => {
  const newType = req.body;
  Types.addType(newType)
    .then(type => {
      res.status(201).json(type);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.put("/:id", (req, res) => {
  const type = req.body;
  const id = req.params.id;
  Types.updateType(id, type)
    .then(updatedType => {
      res.status(200).json(updatedType);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Types.deleteType(id)
    .then(result => {
      res
        .status(200)
        .json({ message: `Successfully deleted type at id ${id}` });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
