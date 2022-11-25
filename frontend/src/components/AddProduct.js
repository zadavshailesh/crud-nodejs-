import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch('http://localhost:4000/add-product', {
      method: 'post',
      body: JSON.stringify({ name, price, company, category, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    console.warn(result);
    navigate('/');
  };

  return (
    <div className="product">
      <h1>AddProduct</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        className="inputBox"
        placeholder="enter product price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        className="inputBox"
        placeholder="enter product category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="enter product company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button type="button" onClick={addProduct} className="button">
        AddProduct
      </button>
    </div>
  );
};
export default AddProduct;
