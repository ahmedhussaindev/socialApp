import { Button, Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseUrl } from "../../constant/environment";
import { toast } from "react-toastify";
import { loginSchema } from "../../Schema/Login.schema";
import { useContext, useState } from "react";
import type { LoginFormData } from "../../types/Auth.type";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { setToken } = useContext(AuthContext)

  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>(
    {
      resolver: zodResolver(loginSchema),
      defaultValues: {
        password: '',
        email: '',
      },
      mode: "onBlur"
    }
  )

  async function handelLogin(value: LoginFormData) {
    setLoading(true)
    try {
      const response = await axios.post(`${baseUrl}/users/signin`, value, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(response);

      if (response?.data?.success == true) {
        toast.success(response.data.message || 'Login successfully!')
        navigate('/Feed')
        setLoading(false)
        setToken(response.data.data.token)
        localStorage.setItem('token', response.data.data.token)
      }
    } catch (err) {
      toast.error('there is an error couldnot Login...')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-10 rounded-md mt-50">
      <h2 className="text-3xl font-bold">Log in to Route Posts</h2>
      <p className="text-slate-500 font-light ps-3">Log in and continue your social journey.</p>
      <form onSubmit={handleSubmit(handelLogin)} className="space-y-5 my-5">

        <Input {...register('email')} aria-label="Email" type="email" className="w-full bg-slate-200" placeholder="Enter your Email" />

        {errors?.email && (
          <p className="text-red-500">{errors?.email?.message}</p>
        )}

        <Input {...register('password')} aria-label="Password" type="password" className="w-full bg-slate-200" placeholder="Enter your Password" />

        {errors?.password && (
          <p className="text-red-500">{errors?.password?.message}</p>
        )}

        <Button isDisabled={isLoading} type="submit" className="bg-main w-full text-white">
          {isLoading && (<span>Lodding...</span>)}
          {!isLoading && (<span>Login</span>)}
        </Button>

        <div className="text-center">
          <span><Link to={'/auth/register'}>Create new account?</Link></span>
        </div>
      </form>
    </div>
  )
}