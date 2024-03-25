import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { addProjects } from '../sevices/allAPI';
import { addProjectResponseContext } from '../context/ContextShare';

function Addproject() {
    const {addProjectResponse, setaddProjectResponse}=useContext(addProjectResponseContext)
    const [previewImage, setpreviewImage] = useState('')
    const [gettoken, setgettoken] = useState("")
    const [pageRestore,setpageRestore]=useState(false)
    const [projectdetails, setprojectdetails] = useState({
        title: "",
        language: "",
        github: "",
        website: "",
        overview: "",
        projectimage: ""

    })
    const [show, setShow] = useState(false);
    const handleadd = async (e) => {
        e.preventDefault()
        console.log("valar", projectdetails)
        const { title, language, github, website, overview, projectimage } = projectdetails
        if (!title || !language || !github || !website || !overview || !projectimage) {
            alert("ols fill the form")

        }
        else {
            const reqbody = new FormData()
            reqbody.append("title", title)
            reqbody.append("language", language)
            reqbody.append("github", github)
            reqbody.append("website", website)
            reqbody.append("overview", overview)
            reqbody.append("projectimage", projectimage)

            const reqheader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${gettoken}`
            };

            const result = await addProjects(reqbody, reqheader)
            if(result){
                setpageRestore(true)
            }
            if (result.status === 200) {
                alert("project add succesfully")
                setaddProjectResponse(result)



            }
            else {
                alert(result.response.data)
            }

        }

handleClose()


    }

    const handleClose = () => {
        setprojectdetails(
            {
                title: "",
                language: "",
                github: "",
                website: "",
                overview: "",
                projectimage: "",

            }
        )
        setpreviewImage("")
        setShow(false)


    };
    const handleShow = () => setShow(true);
    useEffect(() => {


        const tokenvalue = sessionStorage.getItem("token")
        console.log('jjjj', tokenvalue)
        setgettoken(tokenvalue)
        console.log("abus=========", gettoken)
    }, [])

    useEffect(() => {
        if (projectdetails.projectimage) {
            setpreviewImage(URL.createObjectURL(projectdetails.projectimage))
        }
    }, [projectdetails.projectimage])
    useEffect(()=>{
        setpageRestore(false)

    },[pageRestore])
    return (
        <>
            <Button onClick={handleShow} variant='success'>add-project</Button>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label htmlFor="projectimageupload">
                                <input onChange={(e) => setprojectdetails({ ...projectdetails, projectimage: e.target.files[0] })} type="file" style={{ display: 'none' }} id='projectimageupload'></input>
                                <img width="100%" height="200px" src={previewImage ? previewImage : "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"} alt="" />
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleadd}>
                        add project
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default Addproject