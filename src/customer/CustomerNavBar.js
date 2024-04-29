import React, { useEffect, useState } from 'react'
import { Route,Routes,Link,useNavigate } from 'react-router-dom'
import CustomerHome from './CustomerHome';
import DisplayArtwork from '../navbar/DisplayArtwork';
import ShowNavBar from '../navbar/ShowNavBar';
import Favorites from './Favorites';
import Orders from './Orders';
import CustomerProfile from './CustomerProfile';
import Payment from '../components/Payment';

export default function CustomerNavBar() {

  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState("");

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
    }
  }, []);

  const openCustomerProfile = () => {
    navigate('https://onlineartgallery007.netlify.app/customerprofile')
  }

  const handleClick = () => {
    navigate('https://onlineartgallery007.netlify.app/customerhome')
    window.location.reload()
  }

  const handleLogout = () => {
    localStorage.removeItem('isCustomerLoggedIn');
    localStorage.removeItem('customer');
    navigate('https://onlineartgallery007.netlify.app/customerlogin');
    window.location.reload()
  };

  return (
    <div>
        <ShowNavBar>
          <nav>
              <div className="logo">
                  <img src="./logo.png" alt="logo"></img>
                  <span className="logo-name">ART ZONE</span>
              </div>
              <div className="nav-block1">
                  <Link onClick={handleClick}>Home</Link>
                  <Link to="https://onlineartgallery007.netlify.app/favorites">Favorites</Link>
                  <Link to="https://onlineartgallery007.netlify.app/orders">Orders</Link>
                  <Link onClick={handleLogout}>Logout</Link>
              </div>
              <div onClick={openCustomerProfile} className="profile" style={{display:"flex",flexDirection:"row",cursor:"pointer"}}>
                  <span style={{margin:"15px",fontSize:"20px",color:"#00A09A"}} >{customerData.fullname}</span>
                  <img style={{width:"50px"}} src="./profile.png" alt="profile"/>
              </div>
          </nav>
        </ShowNavBar>

        <Routes>
            <Route path="https://onlineartgallery007.netlify.app/customerhome" element={<CustomerHome/>} exact/>
            <Route path="https://onlineartgallery007.netlify.app/favorites" element={<Favorites/>} exact/>
            <Route path="https://onlineartgallery007.netlify.app/orders" element={<Orders/>} exact/>
            <Route path="https://onlineartgallery007.netlify.app/displayartwork" element={<DisplayArtwork/>} exact/>
            <Route path="https://onlineartgallery007.netlify.app/customerprofile" element={<CustomerProfile/>} exact/>
            <Route path="https://onlineartgallery007.netlify.app/processingpayment" element={<Payment/>} exact/>
        </Routes>
    </div>
  )
}
