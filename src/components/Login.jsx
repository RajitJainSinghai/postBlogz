import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { button, input, Logo } from '../components/index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }
                
            }
            
        } catch (error) {
            setError(error.message);
            
        }
    }

    return (
        <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
        <div className="mb-4 space-y-5">
            <input
            label="Email"
            placeholder='Enter your email'
            type='email'
            {...register, {
                required: 'true',
                validate : {
                    matchPatern : (value) => {
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ || "Enter the corrrect the email address."
                    },
                }
            }}
            />

            <input 
            label="Password"
            placeholder='Enter your password'
            type='password'
            {...register, ("password", {
                required: 'true',   
            })}
            />

            <button 
            type='submit'>
            className='w-full bg-primary text-white rounded-lg py-3 font-semibold'
                SignIn
            </button>

        </div>

        </form>

        </div>
        </div>
  )
}

export default Login