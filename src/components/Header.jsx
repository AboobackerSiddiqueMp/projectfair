import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { getProfiledataAPI } from '../sevices/allAPI';
import { BASE_URL } from '../sevices/baseurl';

function Header({ dashboard }) {
  const navigate=useNavigate()
  const [profileData,setProfileData]=useState('')
  const getProfileDatas=async()=>{
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    };

    const result = await getProfiledataAPI(reqheader)
    console.log("abusssss==========",result)
    setProfileData(result.data[0])
    console.log('profiledata======',profileData)

  }
  useEffect(()=>{
    getProfileDatas()

  },[])
  const handileLogout=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existinguser")
    navigate('/')

  }
  return (
    <div>
      <Navbar className="bg-success">
        <Container>
          <Link to={'/'} style={{ textDecoration: 'no' }}>

            <Navbar.Brand className='text-light'>
              <i class="fa-brands fa-stack-overflow me-3 ms-5"></i>
              project fair

            </Navbar.Brand>
          </Link>

          {
            <img src= {profileData? `${BASE_URL}/uploads/${profileData.profileImage}` :"https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} height={'30px'} style={{ marginLeft: '800px' }} alt="" />


          }

          {
            dashboard &&
            <button className='btn btn-warning rounded' onClick={handileLogout}>logout</button>


          }

        </Container>
      </Navbar>
    </div>
  )
}

export default Header