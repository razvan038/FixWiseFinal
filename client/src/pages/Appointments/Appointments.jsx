import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Appointments.css';

function Appointments() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars');
        if (response.data.length === 0) {
          setError('No data');
        } else {
          setCars(response.data.filter(car => car.status === 'In progress'));
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id) => {
    try {
      const carToUpdate = cars.find(car => car.id === id);
      if (carToUpdate) {
        carToUpdate.status = 'Done';
        await axios.put(`http://localhost:5000/cars/${id}`, carToUpdate);
        setCars(cars.map(car => car.id === id ? carToUpdate : car));
      }
    } catch (error) {
      console.error('Failed to update car status:', error);
    }
  };

  return (
    <>
      <div className='dashboard_grid'>
        <Sidebar />
        <div className='main_content'>
          <h1>Appointments</h1>
          {error && <p>{error}</p>}
          {cars.length === 0 ? (
            <p>No cars in progress.</p>
          ) : (
            cars.map(car => (
              <div key={car.id}>
                <p>Make: {car.make}</p>
                <p>Model: {car.model}</p>
                <p>Status: {car.status}</p>
                <button className='cta' onClick={() => handleStatusChange(car.id)}>Mark as Done</button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Appointments;