import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:4000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    console.warn(name, category, price, company);
    let result = await fetch(`http://localhost:4000/product/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, category, price, company }),
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
      <h1>UpdateProduct</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter product price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter product category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="enter product company"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button type="button" onClick={updateProduct} className="button">
        UpdateProduct
      </button>
    </div>
  );
};
export default UpdateProduct;
