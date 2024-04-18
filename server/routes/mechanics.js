const express = require('express');
const fs = require('fs');
const router = express.Router();

const getMechanics = () => {
    let data = fs.readFileSync('mechanics.json', 'utf8');
    if (!data) {
      data = '[]';
    }
    return JSON.parse(data);
  };
  
  const saveMechanics = (mechanics) => {
    if (!Array.isArray(mechanics)) {
      mechanics = [];
    }
    fs.writeFileSync('mechanics.json', JSON.stringify(mechanics));
  };

// GET /mechanics
router.get('/mechanics', (req, res) => {
  const mechanics = getMechanics();
  res.json(mechanics);
});

// POST /mechanics
router.post('/mechanics', (req, res) => {
    const mechanics = getMechanics();
    const newId = mechanics.length > 0 ? Math.max(...mechanics.map(mechanic => mechanic.id)) + 1 : 1;
    const newMechanic = { id: newId, ...req.body };
    
    if (!newMechanic.name || !newMechanic.experience) {
      return res.status(400).json({ message: 'Invalid mechanic data' });
    }
  
    mechanics.push(newMechanic);
    saveMechanics(mechanics);
    res.json(newMechanic);
  });

// PUT /mechanics/:id
router.put('/mechanics/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedMechanic = req.body;
  let mechanics = getMechanics();
  mechanics = mechanics.map(mechanic => mechanic.id === id ? { ...mechanic, ...updatedMechanic } : mechanic);
  saveMechanics(mechanics);
  res.json(updatedMechanic);
});

// DELETE /mechanics/:id
router.delete('/mechanics/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let mechanics = getMechanics();
  mechanics = mechanics.filter(mechanic => mechanic.id !== id);
  saveMechanics(mechanics);
  res.json({ id });
});

module.exports = router;