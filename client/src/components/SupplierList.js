import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/suppliers')
      .then(res => {
        setSuppliers(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Suppliers</h2>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier._id}>{supplier.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;