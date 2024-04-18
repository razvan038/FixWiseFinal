const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const carsRouter = require('./routes/cars');
const mechanicsRouter = require('./routes/mechanics');
const customersRouter = require('./routes/customers');

app.use(cors());
app.use(express.json());
app.use(carsRouter);
app.use(mechanicsRouter);
app.use(customersRouter);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});