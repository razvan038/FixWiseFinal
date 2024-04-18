import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Cars.css';

function Cars() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ make: '', model: '', status: 'In progress' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars');
        if (response.data.length === 0) {
          setError('No data');
        } else {
          setCars(response.data.map(car => ({ ...car, isEditing: false })));
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cars', newCar);
      setCars([...cars, { ...response.data, isEditing: false }]);
      setNewCar({ make: '', model: '', status: 'In progress' });
    } catch (error) {
      console.error('Error adding data', error);
    }
  };

  const handleMakeChange = (id, newMake) => {
    setCars(cars.map(car => car.id === id ? { ...car, make: newMake } : car));
  };

  const handleModelChange = (id, newModel) => {
    setCars(cars.map(car => car.id === id ? { ...car, model: newModel } : car));
  };

  const handleEdit = (id) => {
    setCars(cars.map(car => car.id === id ? { ...car, isEditing: true } : car));
  };

  const handleSubmit = async (id) => {
    const carToUpdate = cars.find(car => car.id === id);
    if (carToUpdate) {
      try {
        await axios.put(`http://localhost:5000/cars/${id}`, carToUpdate);
        setCars(cars.map(car => car.id === id ? { ...car, isEditing: false } : car));
      } catch (error) {
        console.error('Failed to update car:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cars/${id}`);
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  return (
    <>
      <div className='dashboard_grid'>
        <Sidebar />
        <div className='main_content'>
          <h1>Cars</h1>
          {error && <p>{error}</p>}
          <div className='add_form'>
            <input className='input' type="text" value={newCar.make} onChange={e => setNewCar({ ...newCar, make: e.target.value })} placeholder="Car" />
            <input className='input' type="text" value={newCar.model} onChange={e => setNewCar({ ...newCar, model: e.target.value })} placeholder="Model" />
            <button className='cta' onClick={handleAdd}>Add Car</button>
          </div>
          {cars.length === 0 ? (
            <p>No data. Please add a car.</p>
          ) : (
            cars.map(car => (
              <div key={car.id}>
                {car.isEditing ? (
                  <>
                    <input type="text" value={car.make} onChange={e => handleMakeChange(car.id, e.target.value)} />
                    <input type="text" value={car.model} onChange={e => handleModelChange(car.id, e.target.value)} />
                    <button onClick={() => handleSubmit(car.id)}>Submit</button>
                  </>
                ) : (
                  <>
                    <p>Make: {car.make}</p>
                    <p>Model: {car.model}</p>
                    <p>Status: {car.status}</p>
                    <div className='ud_buttons'>
                    <button className='cta' onClick={() => handleEdit(car.id)}>Edit</button>
                    <button className='cta' onClick={() => handleDelete(car.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Cars;