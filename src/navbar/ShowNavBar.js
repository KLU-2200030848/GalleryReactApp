import React, { useState,useEffect } from 'react'
import {useLocation} from 'react-router-dom'

export default function ShowNavBar({children}) 
{

    const location = useLocation();

    const [showNavBar, setShowNavBar] = useState('')

    useEffect(() => {
      if(location.pathname === 'https://onlineartgallery007.netlify.app/customerlogin' || 
      location.pathname === 'https://onlineartgallery007.netlify.app/register' || 
      location.pathname === 'https://onlineartgallery007.netlify.app/forgetpassword' || 
      location.pathname === 'https://onlineartgallery007.netlify.app/artistregister' || 
      location.pathname === 'https://onlineartgallery007.netlify.app/artistlogin' || 
      location.pathname === 'https://onlineartgallery007.netlify.app/adminlogin' || 
      location.pathname === 'https://onlineartgallery007.netlify.app/adminhome' ||
      location.pathname === 'https://onlineartgallery007.netlify.app/publishart' ||
      location.pathname === 'https://onlineartgallery007.netlify.app/displayartwork'||
      location.pathname === 'https://onlineartgallery007.netlify.app/customerprofile' ||
      location.pathname === 'https://onlineartgallery007.netlify.app/artistprofile' ||
      location.pathname === 'https://onlineartgallery007.netlify.app/processingpayment') 
      {
        setShowNavBar(false)
      }    
      else {
        setShowNavBar(true)
      }
    }, [location])
    

  return (
    <div>{showNavBar && children}</div>
  )
}
