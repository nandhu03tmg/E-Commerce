import React, { useState, useEffect } from 'react';
import Admindashboard from './admindashboard';
import './adorders.css';
import Adminnav from './adminnav';
import axios from 'axios';

function Adorders() {
  const [tabledata, settabledata] = useState([]);

  const getdata = () => {
    axios.get('http://localhost:3001/orders').then((result) => {
      settabledata(result.data);
    });
  };

  console.log(tabledata);

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className='adorders'>
      <div className='Adminnavbar'>
        <Adminnav />
      </div>

      <div className="ordercontainer">
        {/* Assuming tabledata is an array of objects */}
          <div className="ordertable">
           <table className='table2'>
            <thead>
              <tr id='heading'>
                <th>Name</th>
                <th>Address</th>
                <th>Product name</th>
                <th>Price</th>
                <th id='tableheadimage'>image</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.map((item) => (
                <tr key={item}>
                  
                  <td><h4>{item.Name}</h4></td>
                  <td id='address'><p>{item.Doorno}{item.Streetname}<br/>{item.City}{item.Pincode}</p></td>
                  <td><p>{item.productData.productname}</p></td>
                  <td>
                    <p>{item.productData.price}</p>
                  </td>
                  <td id='table2img'>
                    <img  src={item.productData.image} alt='' />
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

export default Adorders;
