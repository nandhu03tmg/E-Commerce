import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './dashboard.css'
import axios from 'axios';
import logo from './log01.png'
import { Link } from 'react-router-dom';

// slideshow
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Dashboard() {
  const [tabledata, settabledata] = useState([]);

  const getData = (category) => {
    console.log(category);
    let apiUrl = 'http://localhost:3001/products';

    // menu is not "shop," condion start API URL
    if (category !== 'all') {
      apiUrl += `?category=${category}`;
    }
    axios.get(apiUrl)
      .then((result) => {
        settabledata(result.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    getData("all");
  }, []);

  const getuserdata = () => {
    axios.get('http://localhost:3001/users').then((result) => {
      settabledata(result.data);

    });
  }




  const [formData, setFormData] = useState({
    name: '',
    doorno: '',
    streetname: '',
    city: '',
    pincode: '',
    productData: {}
  });

  // const [paymentData, setpaymentData] = useState({
  //   address: '',
  // });
  const handlePayment = async () => {


    try {
      const response = await axios.post('http://localhost:3001/orders', {
        Name: formData.name,
        Doorno: formData.doorno,
        Streetname: formData.streetname,
        City: formData.city,
        Pincode: formData.pincode,
        productData: formData.productData


      });

      console.log('Order placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };












  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };









  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const images = [
    'https://fdn.gsmarena.com/imgroot/news/20/03/realme-6-realme-6-pro-ofic/-1220x526/gsmarena_000.jpg',
    'https://amitdeyphotography.com/wp-content/uploads/2015/09/AmitDey_Sony-Headphones_05.jpg',
    'https://i.ytimg.com/vi/c8K7lDYhyfM/maxresdefault.jpg',
  ];




  // buy container show
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleBuyClick = (productId) => {
    console.log(productId);
    formData.productData = productId;
    setSelectedProduct((prevSelectedProduct) => (
      prevSelectedProduct === productId.id ? null : productId.id
    ));
    console.log(formData);


    // shopclick
  }
  const [menu, setMenu] = useState("all");

  // quantity
  const [quantity, setQuantity] = useState(1);


  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity || 1);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    



  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
 







  return (
    <div className='dashboardfull'>
      <div className="dashnav">
        <div className="navlogo">
          <img src={logo} alt="" />
          <h3>Quik cart</h3>

        </div>
        <div className="filtercontent">
          <li onClick={() => { setMenu("all"); getData("all"); }}>All{menu === "all" ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("mobile"); getData("mobile"); }}>Mobile{menu === "mobile" ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("tv"); getData("tv"); }}>Tv{menu === "tv" ? <hr /> : <></>}</li>
          <li onClick={() => { setMenu("audio"); getData("audio"); }}>Audios{menu === "audio" ? <hr /> : <></>}</li>
        </div>
        <div className="navcart">
          <Link to='/login2page'><button>Login</button></Link>
          <i><FontAwesomeIcon icon={faCartShopping} /></i>
          <div className="cart-count">0</div>

        </div>



      </div>

      <div className="slidershow">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>

      </div>
      <center><p>EXPLORE THINGS <hr /></p></center>

      <center>
        <div className="product">
          {tabledata.map((product) => (
            <div key={product.id} className="product1">


              <div className="productimg">
                <img src={product.image} alt="" />
              </div>
              <div className="productcontent">
                <h3>{product.productname}</h3>
                <p><b>{product.discount}</b></p>
                <div className="productprice">
                  <h3>{product.price} /-</h3>
                  <del>{product.originalprice}</del>
                </div>
                <div className="buybutton">
                  <button onClick={() => handleBuyClick(product)}>Buy</button>
                </div>
                {selectedProduct === product.id && (
                  <div className='hidecontainer'>
                    <div className="hideheading">
                      <h2>PAYMENT</h2>
                    </div>
                    <div className="hidecontent">
                      <div className="hideinputcontent">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                        <input type="text" name="doorno" value={formData.doorno} onChange={handleChange} placeholder="Door Number" />
                        <input type="text" name="streetname" value={formData.streetname} onChange={handleChange} placeholder="Street Name" />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" />


                      </div>
                      <div className="hideproductcontent">
                        <div className="hideproduct">
                          <h3 name="productname">{product.productname}</h3>
                          <h3 name="productprice">{product.price}</h3>
                          <h4>Shipping Fee 0/-</h4>
                        </div>
                        <div className="hideimageshow">
                          <img src={product.image} alt="" />
                        </div>
                        <div className="hidemulti">
                          <div>
                            
                            <div>
                              <button onClick={handleDecrement}>-</button>
                              <input
                              readOnly
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                              />
                              <button onClick={handleIncrement}>+</button>
                              <p>${product.price * quantity}</p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="paymentsbuttons">
                      <button id='paycancelbutton' onClick={() => handleBuyClick(product)}>Cancel<FontAwesomeIcon icon={faX} /></button>
                      <button id='paybuybutton' onClick={handlePayment}>Place Order</button>

                    </div>



                  </div>
                )}
              </div>
            </div>
          ))}


        </div>
      </center>


    </div>
  )
}

export default Dashboard


