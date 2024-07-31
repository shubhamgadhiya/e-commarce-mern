import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function Allproduct() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    category: 'Mobile',
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [upload, setUpload] = useState(null);
  const [error, setError] = useState('');

  const categories = ['Mobile', 'Laptop', 'Airpods'];

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpload(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.image) {
      setError('Profile picture is required.');
      return;
    }

    try {
      if (newProduct._id) {
        const updateResponse = await axios.put(
          `http://localhost:4000/api/updateproduct/${newProduct._id}`,
          newProduct
        );
        setProducts(updateResponse.data.data);

        if (upload) {
          const formData = new FormData();
          formData.append('image', upload);

          await axios.post('http://localhost:4000/upload', formData, {
            headers: {
              'content-Type': 'multipart/form-data',
            },
          });
        }

        toast.success('Product Updated Successfully', {
          position: 'top-center',
          autoClose: 3000,
        });
      } else {
        const addResponse = await axios.post('http://localhost:4000/api/addproduct', newProduct);
        setProducts(addResponse.data.data);

        if (upload) {
          const formData = new FormData();
          formData.append('image', upload);

          await axios.post('http://localhost:4000/upload', formData, {
            headers: {
              'content-Type': 'multipart/form-data',
            },
          });
        }

        toast.success('Product Added Successfully', {
          position: 'top-center',
          autoClose: 3000,
        });
      }

      fetchProducts();
      setNewProduct({
        category: 'Mobile',
        name: '',
        description: '',
        price: '',
        image: null,
      });
      setUpload(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding/updating product', error);
    }
  };

  const handleAddProduct = () => {
    setNewProduct({
      category: categories[0],
      name: '',
      description: '',
      price: '',
      image: null,
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:4000/api/deleteproduct/${productId}`);
      setProducts(deleteResponse.data.data);
      toast.error('Product Deleted Successfully', {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting product', error);
    }
    fetchProducts();
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar bg-light">
        <h3>All Product</h3>
        <div>
          <Button
            variant="primary"
            className="add-to-cart w-100"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </div>
      </nav>
      <div>
        {products.length > 0 ? (
          <div className="product row mt-3">
            {products.map((product, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="Product"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text description">
                      {product.description}
                    </p>
                    <div>
                      
                      <Button
              variant="primary"
              className="add-to-cart w-100"
                          onClick={() => handleEditProduct(product)}
                        >
                          Update Product
                        </Button>
                        <Button
              variant="primary"
              className="add-to-cart w-100"
                          onClick={() => handleDeleteProduct(product._id)}
                          >
                          Delete Product
                        </Button>
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
      </div>
      <Modal show={showModal} onHide={onClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {newProduct._id ? 'Update Product' : 'Add Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter Product Description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Product Price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              {error && <p className="text-danger text-center">{error}</p>}
              <div className="image-preview mt-3">
                <img
                  src={newProduct.image}
                  alt=""
                  className="img-fluid w-30"
                  style={{ width: '30%' }}
                />
              </div>
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                {newProduct._id ? 'Update Product' : 'Add Product'}
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Allproduct;
