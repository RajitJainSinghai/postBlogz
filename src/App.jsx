import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice";
import {Header, Footer} from "./components";
import './App.css'

function App() {
const [loading, setLoading] = useState(true);
const dispatch = useDispatch();

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if(userData) {
      dispatch(login({userData}));
    }else {
      dispatch(logout(userData));
    }
  })
  .finally(() => {setLoading(false)})
}, []);

  return !loading ? (
    <div>
      <Header />
      <main>
       <h1 className='text-7xl text-red-700 text-center underline '>TODO :</h1>  {/* {<Outlet />}  */}
        </main >
      <Footer />
    </div>
  ) : null
}

export default App
