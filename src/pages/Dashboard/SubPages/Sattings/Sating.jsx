import React, { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { FcAddImage } from "react-icons/fc";
import getMyInfo from '../../../../Hooks/getMyInfo';
import ButtonPrimary from '../../../../components/ButtonPrimary/ButtonPrimary';
import { imageUpload } from '../../../../Hooks/ImageUploade';
import axios from 'axios';
// import Swal from 'sweetalert2';
const Sating = () => {
    const { user,updateUserProfile } = useContext(AuthContext);
    console.log(user)
   const [myInfo,] = getMyInfo()
   console.log(myInfo)
   const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value;
    const organizationName = form.organizationName.value;
    const membershipSize = form.membershipSize.value;
    const fileInput = form.file;

    let uploadedImage; // Declare uploadedImage in the outer scope

    imageUpload(fileInput.files[0])
        .then((imageResponse) => {
            uploadedImage = imageResponse; // Assign the imageResponse to uploadedImage
            console.log(uploadedImage);

         updateUserProfile(displayName, uploadedImage.data.display_url)
         .then(()=>{
            const userData = {
                name: displayName,
                uploadedImage: uploadedImage.data.display_url, // Use uploadedImage here
                organizationName,
                membershipSize,
            }
         axios.patch(`http://localhost:5000/users/${user?.email}`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                const data = response.data;
                console.log(data);
                console.log('Profile information updated successfully');
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
         })
        })

};


    return (
        <>
            <div className=" ">
                <div className=" p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl  font-semibold mb-4">Profile Information</h2>
                    <div className=" md:flex lg:flex  justify-start items-center gap-6 md:gap-10   lg:gap-20">
                        {/* Profile Picture */}
                        {/* Profile Picture */}
                        <form onSubmit={handleSubmit}>
                            <div className="mr-4 flex flex-col justify-center items-center  gap-6">
                                <div className="avatar">
                                    <div className="w-20 md:w-28 lg:w-52 rounded-full ring ring-teal-700 ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL} alt="Profile" />
                                    </div>
                                </div>
                                {/* Add the input element for changing the profile image */}
                                <input style={{ display: 'none' }} type="file" name='file' id='file' />
                                <label className='flex items-center gap-2 cursor-pointer' htmlFor='file'>

                                    < FcAddImage className='text-5xl' />
                                    <span className='opacity-50'>Add new image</span>
                                </label>

                            </div>
                            <div className="divider md:divider-horizontal lg:divider-horizontal"></div>
                            {/* Rest of the Information */}
                            <div className='w-full'>
                                {/* Display Name */}
                                <div className="mb-4">
                                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                        Display Name
                                    </label>
                                    <input
                                        id="displayName"
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                        type="text"
                                        name='displayName'
                                        // value={user?.displayName}
                                        placeholder={user?.displayName}
                                    />
                                </div>
                                {/* user email */}
                                <div className="mb-4">
                                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email" name='email'
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                        type="email"
                                        value={user?.email}
                                        readOnly
                                    // placeholder={user?.email}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                                        Organization Name
                                    </label>
                                    <input
                                        id="organizationName" name='organizationName'
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                        type="text"
                                        // value={myInfo[0]?.organizationName}
                                        placeholder={myInfo[0]?.organizationName}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                                        Membership Size
                                    </label>
                                    <input
                                        id="membershipSize" name='membershipSize'
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                        type="number"
                                        // value={myInfo[0]?.membershipSize}
                                        placeholder={myInfo[0]?.membershipSize}
                                    />
                                </div>
                                <button className='block w-full' >
                                    <ButtonPrimary> Update Your Information</ButtonPrimary>
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <ChangePassword></ChangePassword> */}
        </>

    );
};

export default Sating;
