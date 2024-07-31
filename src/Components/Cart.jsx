

import React, { useState, useEffect } from 'react';
import './ProductList.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function ProductList() {

  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/cart');
      const data = response.data.data;
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart count', error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity, product) => {
    try {
            
      console.log('product123',product )
      const payload = {
        ...product,
        quantity: newQuantity,
      };
      
      await axios.put(`http://localhost:4000/api/updatecart/${productId}`,payload);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating product quantity', error);
    }
  };
  
  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/deletecart/${productId}`, productId);
      setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    } catch (error) {
      console.error('Error removing product from cart', error);
    }
  };
  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="product row mt-3 d-block">
          {cartItems.map((product, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt="Product" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text description">{product.description}</p>
                  <div className="card-price-and-button">
                    <p className="card-price"><strong>Price: </strong>{product.price}</p>
                    <div className="card-quantity">
                    <p className="card-price"><strong>Quantity:  </strong>
                      <Button className='m-2 p-2'
                        type="button" style={{background:"linear-gradient(-135deg, #c850c0, #4158d0)"}}
                        onClick={() => handleQuantityChange(product._id, product.quantity - 1, product)}
                        disabled={product.quantity <= 1}
                      >
                        -
                      </Button>
                      <span>{product.quantity}</span>
                      <Button  className='m-2 p-2'
                        type="button" style={{background:"linear-gradient(-135deg, #c850c0, #4158d0)"}}
                        onClick={() => handleQuantityChange(product._id, product.quantity + 1, product)}
                      >
                        +
                      </Button>
                     </p>
                    </div>
                  </div>
                    <Button
                      type="button"
                      className="add-to-cart m-auto"
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      Remove from Cart
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <p>No Cart found.</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
