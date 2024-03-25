import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../assets/image2.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { getHomeProjects } from '../sevices/allAPI'

function Home() {
    const [isloggedin, setisloggedin] = useState(false)
    const [homeprojectData, sethomeprojectData] = useState('')
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setisloggedin(true)
        }

    }, [])
    const geHomeProject = async () => {
        const data = await getHomeProjects()
        console.log("homeProject=======", data.data)
        sethomeprojectData(data.data)
    }

    useEffect(() => {

        geHomeProject()
    }, [])
    return (
        <div>
            <div className='mb-5 bg-success' style={{ width: "100%", height: "80vh" }}>

                <div className='container-fluid rounded'>
                    <Row className='align-items-center p-5'>
                        <Col sm={12} md={6} lg={6}>
                            <h1 className='text-light mb-3' style={{ fontSize: "70px", fontWeight: "600" }}>project fair</h1>
                            <p>one step destination for all web application pro</p>
                            {
                                isloggedin ?
                                    <Link to={'/dashboard'}> <button className='btn btn-warning'>manege projects</button></Link> :

                                    <Link to={'/register'}> <button className='btn btn-warning'>get started</button></Link>


                            }

                        </Col>
                        <Col sm={12} lg={6} md={6}>
                            <img src={titleimage} height={"450px"} alt="" />
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='mt-5  all-projects'>
                <div className='text-center'>
                    <h1>explore my projects</h1>
                    <marquee scrollAmount={20}>
                        <div className='d-flex mt-5 mb-5'>
                            {
                                homeprojectData.length > 0 ?
                                    homeprojectData.map((item) => (
                                        <div className='ms-5' style={{ width: '400px' }}>
                                            <ProjectCard project={item}></ProjectCard>

                                        </div>

                                    ))
                                    : <h3>no data to show</h3>

                            }



                        </div>
                    </marquee>
                    <div className='text-center mt-5 mb-3'>
                        <h6><Link to={'/project'}>see more projects</Link></h6>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home