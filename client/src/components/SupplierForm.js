import React, { useState } from 'react';
import axios from 'axios';

const SupplierForm = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/suppliers', { name, contact })
      .then(res => {
        console.log(res.data);
        setName('');
        setContact('');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Supplier</h3>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Contact:</label>
      <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
      <button type="submit">Add Supplier</button>
    </form>
  );
};

export default SupplierForm;