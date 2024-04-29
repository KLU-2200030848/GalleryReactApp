import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../artist/artist.css';
import config from '../config';

export default function Favorites() 
{

  const [arts,setArtworks] = useState([]);
  const [artist,setArtist] = useState('');
  const [customer, setCustomer] = useState("");
  const [user,setUser] = useState("");

  useEffect(() => {
    const storedArtistData = localStorage.getItem('artist');
        if (storedArtistData) {
        const parsedArtistData = JSON.parse(storedArtistData);
        setArtist(parsedArtistData)
        } //ARTIST

        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
        const parsedCustomerData = JSON.parse(storedCustomerData);
        setCustomer(parsedCustomerData)
        } //CUSTOMER
  }, [])
  

  const fetchArtworks = async () => {
    artist ? setUser(artist.email) : customer ? setUser(customer.email) : setUser("")
    try {
      const response = await axios.get(`${config.url}/viewfavorite/${user}`)
      setArtworks(response.data);
    }
    catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchArtworks();
  });

  const [size,setSize] = useState('');

  useEffect(() => {
    const img = document.getElementById('myImage');
    if (img) {
      img.addEventListener('load', function () {
        const width = img.width;
        const height = img.height;
        setSize(width > height ? 'landscape' : 'portrait');
      });
    }
  }, [arts]);

  const setObject = async (artid) => {
    try {
      const response = await axios.get(`${config.url}/getartobject/${artid}`);
      if(response.data!=null) {
      localStorage.setItem('artwork', JSON.stringify(response.data));
      }
      window.location.reload()
    }
    catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="explore">
        <div className="display" style={{maxWidth:"100%"}}>
          {Array.isArray(arts) && arts.length > 0 ? (
            arts.map( (art,index) => (
              <Link to="/displayartwork" onClick={() => setObject(art.artid)} key={index} className="artwork">
                  <div>
                    <div className='imgtag' style={{justifyContent:"center"}} >
                    <img id='myImage' className={size} src={`${config.url}/artimage/${art.file}`} alt="art_image"/>  
                    </div>
                    <p style={{color:"#00A09A",fontSize:"20px",fontWeight:"600"}}>{art.title}</p>
                    <p>{art.artist.fullname}</p>
                    <p style={{fontSize:"18px",fontWeight:"bold"}}>₹ {art.price}</p>
                  </div>
              </Link>
            ) )
          ) : (<i>No Artworks Found</i>)
          }
        </div>
    </div>
  )
}
