// import React, { useState, useEffect, useContext } from 'react';
// import './ProductList.css';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../redux/cartslice';
// import './Home.css';
// import { toast } from 'react-toastify';
// import Context from '../Context/Context';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState(['All']);
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const user = useSelector((state) => state.user);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/product");
//       setProducts(response.data.data);
//       setFilteredProducts(response.data.data); // Set initial filtered products to all products

//       // Extract unique categories from products
//       const categories = ['All', ...new Set(response.data.data.map(product => product.category))];
//       setCategories(categories);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCartCount();
//   }, []);

//   useEffect(() => {
//     filterProducts(selectedCategory);
//   }, [selectedCategory, products]);

//   const { fetchCartCount } = useContext(Context);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const filterProducts = (category) => {
//     if (category === 'All') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(product => product.category === category);
//       setFilteredProducts(filtered);
//     }
//   };

//   const addToCartHandler = async (product) => {
//     if (user.isAuth) {
//       dispatch(addToCart(product));
//       const payload = { ...product, quantity: 1 };
//       await axios.post("http://localhost:4000/api/addtocart", payload);
//       fetchCartCount();
//       toast.success("Product added to cart", { position: 'top-center', autoClose: 3000 });
//     } else {
//       toast.error("Please Login...", { position: 'top-center', autoClose: 3000 });
//     }
//   };

//   const showProductDetails = (product) => {
//     navigate(`/product/${product._id}`, { state: { product } });
//   };

//   return (
//     <div>
//       <div className="container">
//         <h1 className="mt-3">Products</h1>
//         <div className="category-buttons">
//           {categories.map(category => (
//             <button 
//               key={category} 
//               className={`category-button ${selectedCategory === category ? 'active' : ''}`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>
//       {filteredProducts.length > 0 ? (
//         <div className="container">
//           <div className="product row mt-3">
//             {filteredProducts.map((product, index) => (
//               <div className="col-md-4 mb-3" key={index}>
//                 <div className="card h-100">
//                   <img
//                     src={product.image}
//                     className="card-img-top"
//                     alt="Product"
//                     onClick={() => showProductDetails(product)}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title" onClick={() => showProductDetails(product)}>{product.name}</h5>
//                     <p className="card-text description">{product.description}</p>
//                     <div className="card-price-and-button">
//                       <p className="card-price"><strong>Price: </strong>${product.price}</p>
//                       <button type="button" className="add-to-cart" onClick={() => addToCartHandler(product)}>Add to Cart</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="mt-3">
//           <p>No products found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useContext } from 'react';
import './ProductList.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartslice';
import './Home.css';
import { toast } from 'react-toastify';
import Context from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const user = useSelector((state) => state.user);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product");
      setProducts(response.data.data);
      setFilteredProducts(response.data.data); // Set initial filtered products to all products

      // Extract unique categories from products
      const categories = ['All', ...new Set(response.data.data.map(product => product.category))];
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, []);

  useEffect(() => {
    filterProducts(selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm, products]);

  const { fetchCartCount } = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterProducts = (category, search) => {
    let filtered = products;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search term
    if (search.trim() !== '') {
      const searchTermLower = search.trim().toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.description.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredProducts(filtered);
  };

  const addToCartHandler = async (product) => {
    if (user.isAuth) {
      dispatch(addToCart(product));
      const payload = { ...product, quantity: 1 };
      await axios.post("http://localhost:4000/api/addtocart", payload);
      fetchCartCount();
      toast.success("Product added to cart", { position: 'top-center', autoClose: 3000 });
    } else {
      toast.error("Please Login...", { position: 'top-center', autoClose: 3000 });
    }
  };

  const showProductDetails = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <h1 className="mt-3">Products</h1>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="container">
          <div className="product row mt-3">
            {filteredProducts.map((product, index) => (
             <div className={filteredProducts.length === 1 ? "col-md-12 mb-3" : "col-md-4 mb-3"} key={index}>
            
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="Product"
                    onClick={() => showProductDetails(product)}
                  />
                  <div className="card-body">
                    <h5 className="card-title" onClick={() => showProductDetails(product)}>{product.name}</h5>
                    <p className="card-text description">{product.description}</p>
                    <div className="card-price-and-button">
                      <p className="card-price"><strong>Price: </strong>${product.price}</p>
                      <button type="button" className="add-to-cart" onClick={() => addToCartHandler(product)}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
