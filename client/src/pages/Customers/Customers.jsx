import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        if (response.data.length === 0) {
          setError('No data');
        } else {
          setCustomers(response.data.map(customer => ({ ...customer, isEditing: false })));
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/customers', newCustomer);
      setCustomers([...customers, { ...response.data, isEditing: false }]);
      setNewCustomer({ name: '', address: '' });
    } catch (error) {
      console.error('Error adding data', error);
    }
  };

  const handleNameChange = (id, newName) => {
    setCustomers(customers.map(customer => customer.id === id ? { ...customer, name: newName } : customer));
  };

  const handleEdit = (id) => {
    setCustomers(customers.map(customer => customer.id === id ? { ...customer, isEditing: true } : customer));
  };

  const handleSubmit = async (id) => {
    const customerToUpdate = customers.find(customer => customer.id === id);
    if (customerToUpdate) {
      try {
        await axios.put(`http://localhost:5000/customers/${id}`, customerToUpdate);
        setCustomers(customers.map(customer => customer.id === id ? { ...customer, isEditing: false } : customer));
      } catch (error) {
        console.error('Failed to update customer:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  return (
    <>
      <div className='dashboard_grid'>
        <Sidebar />
        <div className='main_content'>
          <h1>Customers</h1>
          {error && <p>{error}</p>}
          <div className='add_form'>
            <input className='input' type="text" value={newCustomer.name} onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })} placeholder="Name" />
            <input className='input' type="text" value={newCustomer.address} onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })} placeholder="Address" />
            <button className='cta' onClick={handleAdd}>Add Customer</button>
          </div>
          {customers.length === 0 ? (
            <p>No data. Please add a customer.</p>
          ) : (
            customers.map(customer => (
              <div key={customer.id}>
                {customer.isEditing ? (
                  <>
                    <input className='input' type="text" value={customer.name} onChange={e => handleNameChange(customer.id, e.target.value)} />
                    <button className='cta' onClick={() => handleSubmit(customer.id)}>Submit</button>
                  </>
                ) : (
                  <>
                    <p>Name: {customer.name}</p>
                    <p>Address: {customer.address}</p>
                    <div className='add_form'>
                    <button className='cta' onClick={() => handleEdit(customer.id)}>Edit</button>
                    <button className='cta' onClick={() => handleDelete(customer.id)}>Delete</button>
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

export default Customers;