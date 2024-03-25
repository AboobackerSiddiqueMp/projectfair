import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../sevices/baseurl';
import { updateUseProject } from '../sevices/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({ project }) {
    const [show, setShow] = useState(false);
    const [previewImage, setpreviewImage] = useState('')
    const {editProjectResponse, seteditProjectResponse}=useContext(editProjectResponseContext)


    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);
    const [projectdetails, setprojectdetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectimage: ""

    })
    const reset = () => {
        setprojectdetails({
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectimage: ""

        })
        setpreviewImage("")
    }
    const handileUpdate=async(e)=>{
        console.log("inside updatwe")
        e.preventDefault()
        const {id,title,language,github,website,overview,projectimage}=projectdetails
        if (!title || !language || !github || !website || !overview  || !id){
            alert("field is missing")

        }
        else{
            const reqbody=new FormData();
            reqbody.append("title", title)
            reqbody.append("language", language)
            reqbody.append("github", github)
            reqbody.append("website", website)
            reqbody.append("overview", overview)
            previewImage? reqbody.append("projectimage", projectimage):
            reqbody.append("projectimage", project.projectimage)

            const tokenvalue = sessionStorage.getItem("token")

            if(previewImage){
                const reqheader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${tokenvalue}`
                };
                const result=await updateUseProject(id,reqbody,reqheader)
                if(result.status === 200){
                    alert("project add succesfully")
                    seteditProjectResponse(result)


                    handleClose()
                }
                else{
                    alert(result.response.data)


                }


            }
            else{
                const reqheader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenvalue}`
                };
                const result=await updateUseProject(id,reqbody,reqheader)
                if(result.status === 200){
                    alert("project add succesfully")
                    seteditProjectResponse(result)

                    handleClose()
                }
                else{
                    alert(result.response.data)


                }


            }




           }





    }
    useEffect(() => {
        if (projectdetails.projectimage) {
            setpreviewImage(URL.createObjectURL(projectdetails.projectimage))
        }

    }, [projectdetails.projectimage])

    return (
        <>
            <button className='btn' onClick={handleShow}>  <i class="fa-solid fa-pen-to-square text-info"></i> </button>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label htmlFor="projectimageupload">
                                <input onChange={(e) => setprojectdetails({ ...projectdetails, projectimage: e.target.files[0] })} type="file" style={{ display: 'none' }} id='projectimageupload' ></input>
                                <img width="100%" height="200px" src={previewImage ? previewImage : `${BASE_URL}/uploads/${project.projectimage}`} alt="" />
                            </label>

                        </div>
                        <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
                            <div className='mt-3 mb-3 w-100'>
                                <input type="text" value={projectdetails.title} onChange={(e => { setprojectdetails({ ...projectdetails, title: e.target.value }) })} className='form-control' placeholder='project title' />
                            </div>
                            <div className='mt-3 mb-3 w-100'>
                                <input type="text" value={projectdetails.language} onChange={(e => { setprojectdetails({ ...projectdetails, language: e.target.value }) })} className='form-control' placeholder='language used' />
                            </div>
                            <div className='mt-3 mb-3 w-100'>
                                <input type="text" value={projectdetails.github} onChange={(e => { setprojectdetails({ ...projectdetails, github: e.target.value }) })} className='form-control' placeholder='git-url' />
                            </div>  <div className='mt-3 mb-3 w-100'>
                                <input type="text" value={projectdetails.website} onChange={(e => { setprojectdetails({ ...projectdetails, website: e.target.value }) })} className='form-control' placeholder='website-url' />
                            </div>
                            <div className='mt-3 mb-3 w-100'>
                                <textarea name="" value={projectdetails.overview} onChange={(e => { setprojectdetails({ ...projectdetails, overview: e.target.value }) })} id="" className='form-control' placeholder='overview'></textarea>
                            </div>
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={reset}>
                        reset
                    </Button>
                    <Button variant="primary" onClick={handileUpdate}>
                        update project               </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default EditProject