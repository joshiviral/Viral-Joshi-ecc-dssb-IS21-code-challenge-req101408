import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productId: '',
    productName: '',
    productOwnerName: '',
    scrumMasterName: '',
    startDate: '',
    methodology: '',
    location: ''
  });
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const createProduct = async () => {
    try {
      await axios.post('http://localhost:3000/api/products', newProduct);
      fetchProducts();
      setNewProduct({
        productId: '',
        productName: '',
        productOwnerName: '',
        scrumMasterName: '',
        startDate: '',
        methodology: '',
        location: ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  const startEditingProduct = (productId) => {
    setEditingProductId(productId);
  };

  const cancelEditingProduct = () => {
    setEditingProductId(null);
    setNewProduct({
      productId: '',
      productName: '',
      productOwnerName: '',
      scrumMasterName: '',
      startDate: '',
      methodology: '',
      location: ''
    });
  };

  const updateProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:3000/api/products/${productId}`, newProduct);
      fetchProducts();
      setEditingProductId(null);
      setNewProduct({
        productId: '',
        productName: '',
        productOwnerName: '',
        scrumMasterName: '',
        startDate: '',
        methodology: '',
        location: ''
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Owner</th>
            <th>Scrum Master</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>{product.location}</td>
              <td>
                {editingProductId === product.productId ? (
                  <>
                    <button onClick={() => updateProduct(product.productId)}>Save</button>
                    <button onClick={cancelEditingProduct}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEditingProduct(product.productId)}>Edit</button>
                <button onClick={() => deleteProduct(product.productId)}>Delete</button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <h2>Add Product</h2>
<form>
  <div className="mb-3">
    <label htmlFor="productId">Product ID:</label>
    <input type="text" id="productId" name="productId" value={newProduct.productId} onChange={handleInputChange} />
  </div>

  <div>
    <label htmlFor="productName">Product Name:</label>
    <input type="text" id="productName" name="productName" value={newProduct.productName} onChange={handleInputChange} />
  </div>

  <div>
    <label htmlFor="productOwnerName">Product Owner:</label>
    <input type="text" id="productOwnerName" name="productOwnerName" value={newProduct.productOwnerName} onChange={handleInputChange} />
  </div>

  <div>
    <label htmlFor="scrumMasterName">Scrum Master:</label>
    <input type="text" id="scrumMasterName" name="scrumMasterName" value={newProduct.scrumMasterName} onChange={handleInputChange} />
  </div>

  <div>
    <label htmlFor="startDate">Start Date:</label>
    <input type="text" id="startDate" name="startDate" value={newProduct.startDate} onChange={handleInputChange} />
  </div>

  <div>
    <label htmlFor="methodology">Methodology:</label>
    <input type="text" id="methodology" name="methodology" value={newProduct.methodology} onChange={handleInputChange} />
  </div>

  <div>
    <label htmlFor="location">Location:</label>
    <input type="text" id="location" name="location" value={newProduct.location} onChange={handleInputChange} />
  </div>

  <button className=".btn" onClick={createProduct}>Add Product</button>
  </form>
</div>);
};
export default ProductList;