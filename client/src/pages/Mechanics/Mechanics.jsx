import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar'

function Mechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [newMechanic, setNewMechanic] = useState({ name: '', experience: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/mechanics');
        if (response.data.length === 0) {
          setError('No data');
        } else {
          setMechanics(response.data.map(mechanic => ({ ...mechanic, isEditing: false })));
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/mechanics', newMechanic);
      setMechanics([...mechanics, { ...response.data, isEditing: false }]);
      setNewMechanic({ name: '', experience: '' });
    } catch (error) {
      console.error('Error adding data', error);
    }
  };

  const handleNameChange = (id, newName) => {
    setMechanics(mechanics.map(mechanic => mechanic.id === id ? { ...mechanic, name: newName } : mechanic));
  };

  const handleEdit = (id) => {
    setMechanics(mechanics.map(mechanic => mechanic.id === id ? { ...mechanic, isEditing: true } : mechanic));
  };

  const handleSubmit = async (id) => {
    const mechanicToUpdate = mechanics.find(mechanic => mechanic.id === id);
    if (mechanicToUpdate) {
      try {
        await axios.put(`http://localhost:5000/mechanics/${id}`, mechanicToUpdate);
        setMechanics(mechanics.map(mechanic => mechanic.id === id ? { ...mechanic, isEditing: false } : mechanic));
      } catch (error) {
        console.error('Failed to update mechanic:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/mechanics/${id}`);
      setMechanics(mechanics.filter(mechanic => mechanic.id !== id));
    } catch (error) {
      console.error('Failed to delete mechanic:', error);
    }
  };

  return (
    <>
      <div className='dashboard_grid'>
        <Sidebar />
        <div className='main_content'>
          <h1>Mechanics</h1>
          {error && <p>{error}</p>}
          <div className='add_form'>
            <input className='input' type="text" value={newMechanic.name} onChange={e => setNewMechanic({ ...newMechanic, name: e.target.value })} placeholder="Name" />
            <input className='input' type="text" value={newMechanic.experience} onChange={e => setNewMechanic({ ...newMechanic, experience: e.target.value })} placeholder="Experience" />
            <button className='cta' onClick={handleAdd}>Add Mechanic</button>
          </div>
          {mechanics.length === 0 ? (
            <p>No data. Please add a mechanic.</p>
          ) : (
            mechanics.map(mechanic => (
              <div key={mechanic.id}>
                {mechanic.isEditing ? (
                  <>
                    <input className='input' type="text" value={mechanic.name} onChange={e => handleNameChange(mechanic.id, e.target.value)} />
                    <button className='cta' onClick={() => handleSubmit(mechanic.id)}>Submit</button>
                  </>
                ) : (
                  <>
                    <p>Name: {mechanic.name}</p>
                    <p>Experience: {mechanic.experience}</p>
                    <div className='ud_buttons'>
                    <button className='cta' onClick={() => handleEdit(mechanic.id)}>Edit</button>
                    <button className='cta' onClick={() => handleDelete(mechanic.id)}>Delete</button>
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

export default Mechanics;