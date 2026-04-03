import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Button from "./Button.jsx"
import Input from "./Input.jsx"
import Logo from "./Logo.jsx"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: "subhasankarsahu5@gmail.com",
            password: "pass1234",
        }
    })
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({
                        $id: userData.$id,
                        name: userData.name,
                        email: userData.email,
                    }));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full px-4 py-10'
    >
        <div className={`mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm`}>
        <div className="mb-6 flex justify-center">
                    <span className="inline-block">
                        <Logo />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-slate-900">Sign in</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-slate-900 underline-offset-4 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="mt-6 text-center text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full rounded-xl"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
