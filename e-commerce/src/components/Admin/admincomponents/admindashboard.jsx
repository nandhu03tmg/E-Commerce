import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './admindashboard.css';
import Adminnav from './adminnav';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons';



function Admindashboard() {
  const [tabledata, settabledata] = useState([]);
  const [formData, setFormData] = useState({
    productname: '',
    price: '',
    discount: '',
    originalprice: '',
    image: '',
    category: ''
  });
  const [selectedProductId, setSelectedProductId] = useState(null); // Track the selected product ID for update

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios.get('http://localhost:3001/products').then((result) => {
      settabledata(result.data);
    });
  };

  const handleCreate = () => {
    console.log(formData)
    axios.post('http://localhost:3001/products', formData).then((res) => {
      console.log(res);
      getdata();
    });
  };

  const handleUpdate = () => {
    console.log(formData);
    if (selectedProductId) {
      axios.patch(`http://localhost:3001/products/${selectedProductId}`, formData).then((res) => {
        console.log(res);
        getdata();
        // Reset the form after successful update
        setFormData({
          productname: '',
          price: '',
          discount: '',
          originalprice: '',
          image: '',
        });
        setSelectedProductId(null); // Reset selected product ID
      });
    } else {
      console.error('No product selected for update.');
    }
  };

  const handleReset = () => {
    setFormData({
      productname: '',
      price: '',
      discount: '',
      originalprice: '',
      image: '',

    });
    setSelectedProductId(null); // Reset selected product ID
  };

  const handleDelete = (productId) => {
    axios.delete(`http://localhost:3001/products/${productId}`).then((res) => {
      console.log(res);
      getdata();
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateButtonClick = (productId) => {
    // Set the selected product ID and fetch its details
    setSelectedProductId(productId);
    const selectedProduct = tabledata.find((product) => product.id === productId);
    setFormData(selectedProduct);
  };

  return (
    <div className='dashfull'>
      <div className="adminnavfixed">
        <div className="admindiv">
          <Adminnav />
        </div>
      </div>
      <div className='dashcontent'>
        <div className="dashinput-button">
          <div className="serverinputs">
            <input onChange={handleInputChange} name='productname' type='text' placeholder='product name' value={formData.productname} />
            <input onChange={handleInputChange} name='price' type='text' placeholder='price' value={formData.price} />
            <input onChange={handleInputChange} name='discount' type='text' placeholder='discount' value={formData.discount} />
            <input onChange={handleInputChange} name='originalprice' type='text' placeholder='original price' value={formData.originalprice} />
            <input onChange={handleInputChange} name='image' type='text' placeholder='img url' value={formData.image} />
            <select value={formData.category} onChange={handleInputChange} name="category" id="">
              <option value="mobile">Mobilles</option>
              <option value="tv">Tv</option>
              <option value="audio">Audios</option>
            </select>
          </div>
          <div className="createbuttons">
            <button onClick={handleReset}>reset</button>
            <button style={{background:"green"}} onClick={selectedProductId ? handleUpdate : handleCreate}>{selectedProductId ? 'update' : 'create'}</button>
          </div>
        </div>
        <div className='Tablecontainer'>
          <table className='table'>
            <thead>
              <tr>
                <th id='tableheadradios'>productname</th>
                <th>price</th>
                <th>discount</th>
                <th>originalprice</th>
                <th id='tableheadimage'>image</th>
                <th id='tableheadradios2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((item, index) => (
                <tr key={index}>

                  <td><h4>{item.productname}</h4></td>
                  <td><p>{item.price}/-</p></td>
                  <td><p>{item.discount}%</p></td>
                  <td>
                    <del>{item.originalprice}</del>
                  </td>
                  <td id='tableimg'>
                    <img src={item.image} alt='' />
                  </td>
                  <td>
                    <button style={{background:"none", color:"#0275d8"}}  id='tablebutton' onClick={() => handleUpdateButtonClick(item.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button style={{background:"none",color:"#d9534f"}}  id='tablebutton' onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
