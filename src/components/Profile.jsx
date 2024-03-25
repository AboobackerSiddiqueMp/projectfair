import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { addProfileAPI, getProfiledataAPI } from '../sevices/allAPI';
import { BASE_URL } from '../sevices/baseurl';

function Profile() {
    const [open, setOpen] = useState(false);
    const [previewImage, setpreviewImage] = useState('')
    const [gettoken, setgettoken] = useState('')
    const [profileData, setprofileData] = useState({
        profileImage: "",
        linkdin: "",
        github: ""
    })

    const handileprofile = async () => {
        console.log(profileData)
        const { profileImage, linkdin, github } = profileData
        if (!profileImage || !linkdin || !github) {
            alert("plese fill the form completely")
        }
        else {
            console.log("token===========", gettoken)
            const reqbody = new FormData()
            reqbody.append("github", github)
            reqbody.append("linkdin", linkdin)
            reqbody.append("profileImage", profileImage)
            const reqheader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${gettoken}`
            };
            const result = await addProfileAPI(reqbody, reqheader)
            console.log("resultprofile===========", result)

        }



    }
    useEffect(() => {
        if (profileData.profileImage) {
            setpreviewImage(URL.createObjectURL(profileData.profileImage))
        }
    }, [profileData.profileImage])

    useEffect(() => {


        const tokenvalue = sessionStorage.getItem("token")
        console.log('jjjj', tokenvalue)
        setgettoken(tokenvalue)
        console.log("abus=========", gettoken)

    }, [])
    const [getprofileData, setgetProfileData] = useState('')
    const getProfileDatas = async () => {
        const token = sessionStorage.getItem("token")
        const reqheader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        };

        const result = await getProfiledataAPI(reqheader)
        console.log("abusssss==========", result)
        setgetProfileData(result.data[0])
        console.log('profiledata======', getprofileData)

    }
    useEffect(() => {
        getProfileDatas()

    }, [])


    return (
        <div>
            <div className='card shadow m-4 p-5'>
                <div className='d-flex justify-content-beteween'>
                    <h2>profile</h2>
                    < button className='btn btn-outline-info' style={{ marginLeft: '120px' }} onClick={() => setOpen(!open)}>
                        <i class="fa-solid fa-angle-down ms"></i>
                    </button>
                </div>
                <Collapse in={open}>

                    <div>
                        {getprofileData ? <img className='text-center mb-2 mt-3' src={profileData ? `${BASE_URL}/uploads/${getprofileData.profileImage}` : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"} width={"200px"} height={"200px"} alt="" />
                            : (
                                <label htmlFor='profile' className='text-center mb-2 mt-3'>
                                    <input type="file" style={{ display: "none" }} id='profile' onChange={(e) => setprofileData({ ...profileData, profileImage: e.target.files[0] })} />
                                    <img className='rounded' src={previewImage ? previewImage : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} width={"200px"} height={"200px"} alt="" />
                                </label>
                            )}
                        <div>
                            {getprofileData ? <><button className='btn' href={getProfileDatas.github}><i class="fa-brands fa-github  text-success" style={{ fontSize: "30px" }}></i></button>
                            <button className='btn' href={getProfileDatas.linkdin}><i class="fa-brands fa-linkedin  text-primary" style={{ fontSize: "30px" }}></i></button></> :
                                (            <><input type="text" placeholder='enter git link' className='form-control' onChange={(e) => setprofileData({ ...profileData, github: e.target.value })} /><input type="text" placeholder='enter linkdin link' className='form-control mt-2' onChange={(e) => setprofileData({ ...profileData, linkdin: e.target.value })} /><button className='btn btn-success  w-50 mt-3 me-3' onClick={handileprofile}>add profile</button><button className='btn btn-success  w-50 mt-3'>update profile</button></>
                                )}

                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default Profile