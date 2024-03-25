import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import mediaplyerimage from '../assets/Screenshot 2024-01-29 135548.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../sevices/baseurl';

function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("ffffff=",project.projectimage)

  return (
    <>
    <Card style={{ width: '18rem' }} onClick={handleShow}>
      <Card.Img variant="top" width={'30px'} height={'150px'} src={`${BASE_URL}/uploads/${project.projectimage}`} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} lg={6}>
              <img src={`${BASE_URL}/uploads/${project.projectimage}`} width={"100%"} height={"250px"} alt="" />
            </Col>
            <Col md={6} lg={6}>
              <h4>Description</h4>
              <p>{project.overview}</p>
            </Col>
          </Row>
          <div className='d-flex mt-3'>
            <a href={project.github} style={{color:'black',fontSize:'25px'}} ><i class="fa-brands fa-github ms-3"></i></a>
            <a href={project.website}  style={{color:'black',fontSize:'25px'}}><i class="fa-solid fa-link ms-3"></i></a>
          </div>
        </Modal.Body>
     </Modal>
    </>
  )
}

export default ProjectCard