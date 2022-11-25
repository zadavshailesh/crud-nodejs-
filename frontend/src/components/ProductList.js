import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [product, setProduct] = useState('');

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch('http://localhost:4000/products', {
      headers: {
        authorization: JSON.parse(localStorage.getItem('token')),
      },
    });
    result = await result.json();
    setProduct(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4000/product/${id}`, {
      method: 'Delete',
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4000/search/${key}`);
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getProduct();
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <input
        type="text"
        className="searchBox"
        placeholder="search..."
        onChange={searchHandle}
      />
      <ul className="table-heading">
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>

      {product.length > 0 ? (
        product.map((item, index) => (
          <ul key={index}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>NO RESULT FOUND</h1>
      )}
    </div>
  );
};

export default ProductList;
