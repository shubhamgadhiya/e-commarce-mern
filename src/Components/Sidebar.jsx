import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import Alluser from './Alluser';
import Allproduct from './Allproduct';
import './Sidebar.css';
function Sidebar() {
  const [content, setContent] = useState('user');

  const handleUserClick = () => {
    setContent('user');
  };
  const handleProductClick = () => {
    setContent('product');
  };
  return (
    <div className="d-flex">
      <div className="leftSideStyle">
        <h3>Sidebar</h3>
        <ul className="list">
          <li
            className={content === 'user' ? 'active listStyle' : 'listStyle'}
            onClick={handleUserClick}>
            User
          </li>
          <li
            className={
              content === 'product' ? 'active leftsidelist' : 'leftsidelist'
            }
            onClick={handleProductClick}>
            Product
          </li>
        </ul>
        <div className="logout-button mt-5 text-center">
          {/* <button className="logout mt-3">Logout</button> */}
          <Button variant="primary" >
            Logout
          </Button>
        </div>
      </div>
      <div className="content contentStyle">
        {content == 'user' && <Alluser user={content} />}
        {content == 'product' && <Allproduct user={content} />}
      </div>
    </div>
  );
}

export default Sidebar;
