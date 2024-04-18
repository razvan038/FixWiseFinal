import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

function History() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cars');
        if (response.data.length === 0) {
          setError('No data');
        } else {
          setCars(response.data.filter(car => car.status === 'Done'));
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='dashboard_grid'>
        <Sidebar />
        <div className='main_content'>
          <h1>History</h1>
          {error && <p>{error}</p>}
          {cars.length === 0 ? (
            <p>No cars are done.</p>
          ) : (
            cars.map(car => (
              <div key={car.id}>
                <p>Make: {car.make}</p>
                <p>Model: {car.model}</p>
                <p>Status: {car.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default History;