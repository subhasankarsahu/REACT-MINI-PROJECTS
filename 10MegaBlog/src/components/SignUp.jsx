import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Logo from './Logo.jsx'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: "Subha Sankar Sahu",
            email: "subhasankarsahu5@gmail.com",
            password: "pass1234",
        }
    })

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(login({
                        $id: currentUser.$id,
                        name: currentUser.name,
                        email: currentUser.email,
                    }));
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center px-4 py-10">
            <div className={`mx-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm`}>
            <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-slate-900">Create account</h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-slate-900 underline-offset-4 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="mt-6 text-center text-sm text-red-600">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
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
                            required: true,})}
                        />
                        <Button type="submit" className="w-full rounded-xl">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup
