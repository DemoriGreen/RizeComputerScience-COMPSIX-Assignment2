const express = require("express");
const router = express.Router();
const validateMenuItem = require("../middleware/validateMenu");

let menu = [];
let idCounter = 1;

// GET all
router.get("/", (req, res) => {
  res.status(200).json(menu);
});

// GET by ID
router.get("/:id", (req, res) => {
  const item = menu.find(m => m.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  res.status(200).json(item);
});

// POST
router.post("/", validateMenuItem, (req, res) => {
  const newItem = {
    id: idCounter++,
    available: true,
    ...req.body
  };

  menu.push(newItem);
  res.status(201).json(newItem);
});

// PUT
router.put("/:id", validateMenuItem, (req, res) => {
  const index = menu.findIndex(m => m.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  menu[index] = { ...menu[index], ...req.body };

  res.status(200).json(menu[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const index = menu.findIndex(m => m.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  const deleted = menu.splice(index, 1);

  res.status(200).json({
    message: "Menu item deleted successfully",
    deleted
  });
});

module.exports = router;