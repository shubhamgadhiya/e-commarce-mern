import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
function UploadProductModal({ product, showModal, onClose, onSubmit }) {
  const [newProduct, setNewProduct] = useState({
    id: '',
    image: '',
    name: '',
    description: '',
    price: '',
    category: 'Mobile', // Default category
  });
  const [upload, setUpload] = useState();

  useEffect(() => {
    if (product) {
      setNewProduct({
        id: product._id,
        image: product.image,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category || 'Mobile',
      });
    }
  }, [product]);

  const categories = ['Mobile', 'Laptop', 'Tv'];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUpload(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({
        ...newProduct,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (upload) {
        const formData = new FormData();
        formData.append('image', upload);
        const imageResponse = await axios.post("http://localhost:4000/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("imageResponse", imageResponse);
      }
      onSubmit(newProduct);
      onClose();
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  return (
    <Modal show={showModal} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Update Product' : 'Upload Product'}</Modal.Title>
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
                <option key={index} value={category}>{category}</option>
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
            {newProduct.image && (
              <div className="image-preview mt-3">
                <img src={newProduct.image} alt="Preview" className="img-fluid w-30" style={{ width: '30%' }} />
              </div>
            )}
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {product ? 'Update Product' : 'Upload Product'}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UploadProductModal;
