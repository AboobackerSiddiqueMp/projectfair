import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import Myprojects from '../components/Myprojects'
import { json, useNavigate } from 'react-router-dom'

function Dashboard(){
  const navigate=useNavigate()
  const [username,setusername]=useState("")
  useEffect(()=>{
if(sessionStorage.getItem("existinguser")){
  const existingdata= JSON.parse(sessionStorage.getItem("existinguser"))
  setusername(existingdata.username)
}
else{
  navigate('/')

}
  },[])
  return (
    <div>
      <Header dashboard={"dashboard"}></Header>
      <h2 className='mt-5 ms-3'>welcome <span style={{color:"orange"}}>{username}</span></h2>
      <Row>
        <Col md={8} lg={8}>
          <Myprojects></Myprojects>
        </Col>
        <Col md={4} lg={4}>
          <Profile></Profile>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard