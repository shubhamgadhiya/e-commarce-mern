import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div className="product-details">
      {product ? (
          <div className="product row mt-3">
            <div className="col-md-4 mb-3" >
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt="Product"
              
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text description">{product.description}</p>
                  <div className="card-price-and-button">
                    <p className="card-price"><strong>Price: </strong>${product.price}</p>
                    <button type="button" className="add-to-cart" >Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
         
        </div>
      ) : (
        <div className="mt-3">
          <p>Loading product details...</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
