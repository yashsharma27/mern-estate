import React, { useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    set;
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        {/* <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer
        self-center mt-2'></img> */}
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input onChange={handleChange}type="text" placeholder='username' className='border p-3 rounded-lg'  id='username' defaultValue={currentUser.username}/>
        <input onChange={handleChange}type="email" placeholder='email' className='border p-3 rounded-lg'  id='email' defaultValue={currentUser.email}/>
        <input onChange={handleChange}type="password" placeholder='password' className='border p-3 rounded-lg'  id='password'/>
        <button className='bg-slate-500 text-white rounded-lg p-3 uppercase hover:opacity-95'>Update</button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
