import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import logout from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();
    const handleLogut = () => {
        authService.logout()
        .then(() => dispatch(logout()))
    }
  return (
    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded '>LogoutBtn</button>
  )
}

export default LogoutBtn