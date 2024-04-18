const express = require('express');
const fs = require('fs');
const router = express.Router();

const getCars = () => {
  let data = fs.readFileSync('cars.json', 'utf8');
  if (!data) {
    data = '[]';
  }
  return JSON.parse(data);
};

const saveCars = (cars) => {
  if (!Array.isArray(cars)) {
    cars = [];
  }
  fs.writeFileSync('cars.json', JSON.stringify(cars));
};

// GET /cars
router.get('/cars', (req, res) => {
  const cars = getCars();
  res.json(cars);
});

// POST /cars
router.post('/cars', (req, res) => {
  const cars = getCars();
  const newId = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;
  const newCar = { id: newId, ...req.body };

  if (!newCar.make || !newCar.model) {
    return res.status(400).json({ message: 'Invalid car data' });
  }

  cars.push(newCar);
  saveCars(cars);
  res.json(newCar);
});

// PUT /cars/:id
router.put('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCar = req.body;
  let cars = getCars();
  cars = cars.map(car => car.id === id ? { ...car, ...updatedCar } : car);
  saveCars(cars);
  res.json(updatedCar);
});

// DELETE /cars/:id
router.delete('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let cars = getCars();
  cars = cars.filter(car => car.id !== id);
  saveCars(cars);
  res.json({ id });
});

module.exports = router;