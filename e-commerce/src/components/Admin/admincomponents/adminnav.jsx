import React, { useEffect } from 'react'
import './adminnav.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faBox } from '@fortawesome/free-solid-svg-icons'



function Adminnav() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/adminlogin')
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    });

    return (
        <div className='nav'>
            <div className="navcontent">
                <h1>Quik Kart <hr /></h1>
                <div className="navlayouts">

                    <Link id='link' to="/admindashboard"><i><FontAwesomeIcon icon={faGauge} /></i><h2>Dashboard</h2></Link><hr /><br />
                    <Link id='link' to="/adorders"><i><FontAwesomeIcon icon={faBox} /></i><h2>Orders </h2></Link><hr />
                </div>
                <div className="adminogout"><button onClick={handleLogout}>LOGOUT</button>
                </div>
            </div>
        </div>
    )
}

export default Adminnav