import React, { useState, useEffect } from 'react';
import './ProductList.css';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import UploadProductModal from './ProductModal'; // Assuming you have this component

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product");
      console.log("response", response);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateClick = (product) => {
    console.log("product", product)
    setSelectedProduct(product);
  };

  const handleProductUpdate = async (selectedProduct) => {
console.log("selectedProduct", selectedProduct)
    try {
      const response = await axios.put(`http://localhost:4000/api/updateproduct/${selectedProduct.id}`, selectedProduct);
      if (response.status === 200) {
        fetchProducts();
        console.log('Product updated successfully');
      }
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  return (
    <div>
      {products.length > 0 ? (
        <div className="product row mt-3">
          {products.map((product, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt="Product" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text description">{product.description}</p>
                  <div className="card-price-and-button">
                    <p className="card-price"><strong>Price: </strong>${product.price}</p>
                    <button type="button" className="add-to-cart" onClick={() => handleUpdateClick(product)}>Update Product</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <p>No products found.</p>
        </div>
      )}

      {/* Modal for updating product */}
      {selectedProduct && (
        <UploadProductModal
          product={selectedProduct}
          showModal={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSubmit={handleProductUpdate}
        />
      )}
    </div>
  );
}

export default ProductList;
