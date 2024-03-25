import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import {  deleteProjectAPI, getUserProjectdata } from '../sevices/allAPI';
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare';
import EditProject from './EditProject';

function Myprojects() {
  const [userprojects, setuserprojects] = useState('')
  const [editstatus,seteditstatus]=useState(false)
  const [deletestatus,setdeletestatus]=useState(false)
  const {addProjectResponse, setaddProjectResponse}=useContext(addProjectResponseContext)
  const {editProjectResponse, seteditProjectResponse}=useContext(editProjectResponseContext)
  

  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    };
    const result = await getUserProjectdata(reqheader)
    console.log("user========", result)
    setuserprojects(result.data)


  }
  const handileDelete=async(id)=>{
    console.log("inside hd",id)
    const token = sessionStorage.getItem("token")
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const result= await deleteProjectAPI(id,reqheader)
    setdeletestatus(true)


  }

  useEffect(() => {
    getUserProjects()
  }, [addProjectResponse,deletestatus,editProjectResponse])
  useEffect(() => {
    if(deletestatus){
      setdeletestatus(false)
    }
  }, [deletestatus])
  


  return (
    <>
      <div className='card shadow p-5 me-3 mb-5'>
        <div className='d-flex'>
          <h3 className='text-success me-3'> my project </h3>
          <div className='ms-auto'>
            <Addproject></Addproject>
          </div>
        </div>
        <div>
          {
            userprojects?.length > 0 ?
              userprojects.map((item) => (
                <div className='border d-flex align-items-center rounded p-2 MB-3'>
                  <h5>{item.title}</h5>
                  <div className='ms-auto'>
                    <EditProject project={item}></EditProject>
                    <button className='btn' href={item.github}><i class="fa-brands fa-github  text-success"></i></button>
                    <button className='btn' onClick={()=>handileDelete(item._id)}> <i class="fa-solid fa-trash text-danger"></i></button>
                  </div>
                </div>

              ))
              :
              <p className='text-danger fw-bolder fs-4 mt-3'>no project upload yet</p>

          }



        </div>
      </div>

    </>
  )
}

export default Myprojects