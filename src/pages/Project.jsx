import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProject } from '../sevices/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [istoken,setistoken]=useState(false)

  const [allProjectsData, setallProjectsData] = useState("")
  const [projectSearch,setprojectSearch]=useState('')
  console.log(projectSearch)

  const getAllData = async () => {
    if (sessionStorage.getItem("token")) {
      const tokenvalue = sessionStorage.getItem("token")
      const reqheader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${tokenvalue}`
      };
      const allProjectData = await getAllProject(projectSearch,reqheader)
      console.log("vvvvvvvvvvv", allProjectData)
      setallProjectsData(allProjectData.data)




    }






  }

  useEffect(() => {
    getAllData()



  }, [projectSearch])

  return (
    <div>


      <Header></Header>
      <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
        <h2>all projects</h2>
        <div className='mt-5 w-25 d-flex'>
          <input onChange={(e)=>{setprojectSearch(e.target.value)}} type="text" placeholder='serch project by tech' className='form-control' /><i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{ marginLeft: "-45px" }}></i>
        </div>
      </div>
      <Row className='m-5'>

        {
          allProjectsData.length > 0 ?
            allProjectsData.map((item) => (
              <Col sm={12} lg={4} md={4} >
                <div className='ms-5 mt-4'>
                <ProjectCard project={item} ></ProjectCard>
                </div>

              </Col>

            ))
            :
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <img src="https://cdn.pixabay.com/photo/2016/12/18/12/49/cyber-security-1915626_1280.png" height={"300px"} width={"300px"} alt="" />
<p>plese <Link to='/login' style={{textDecoration:'none'}}>login</Link>  to see projects</p>
            </div>
        }
      </Row>


    </div>
  )
}

export default Project