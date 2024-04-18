const express = require('express');
const fs = require('fs');
const router = express.Router();

const getCustomers = () => {
  let data = fs.readFileSync('customers.json', 'utf8');
  if (!data) {
    data = '[]';
  }
  return JSON.parse(data);
};

const saveCustomers = (customers) => {
  if (!Array.isArray(customers)) {
    customers = [];
  }
  fs.writeFileSync('customers.json', JSON.stringify(customers));
};

// GET /customers
router.get('/customers', (req, res) => {
  const customers = getCustomers();
  res.json(customers);
});

// POST /customers
router.post('/customers', (req, res) => {
  const customers = getCustomers();
  const newId = customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 1;
  const newCustomer = { id: newId, ...req.body };

  if (!newCustomer.name || !newCustomer.address) {
    return res.status(400).json({ message: 'Invalid customer data' });
  }

  customers.push(newCustomer);
  saveCustomers(customers);
  res.json(newCustomer);
});

// PUT /customers/:id
router.put('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedCustomer = req.body;
  let customers = getCustomers();
  customers = customers.map(customer => customer.id === id ? { ...customer, ...updatedCustomer } : customer);
  saveCustomers(customers);
  res.json(updatedCustomer);
});

// DELETE /customers/:id
router.delete('/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let customers = getCustomers();
  customers = customers.filter(customer => customer.id !== id);
  saveCustomers(customers);
  res.json({ id });
});

module.exports = router;