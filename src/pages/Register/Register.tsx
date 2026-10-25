import { Button, Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { ListBox, Select } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../Schema/register.schema";
import axios from "axios";
import { baseUrl } from "../../constant/environment";
import { toast } from "react-toastify";
import { useState } from "react";
import type { z } from "zod";
import type { RegisterFormData } from "../../types/Auth.type";


export default function Register() {

  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, control } = useForm<z.infer<typeof registerSchema>>(
    {
      resolver: zodResolver(registerSchema),
      defaultValues: {
        name: '',
        username: '',
        password: '',
        dateOfBirth: '',
        rePassword: '',
        email: '',
        gender: undefined
      },
      mode: "onBlur"
    }
  )

  async function handelRegister(value: RegisterFormData) {
    setLoading(true)
    try {
      const response = await axios.post(`${baseUrl}/users/signup`, value, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(response);

      if (response?.data?.success == true) {
        toast.success(response.data.message || 'account created successfully!')
        navigate('/auth/login')
        setLoading(false)
      }
    } catch (err) {
      toast.error('there is an error couldnot create account...')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-10 rounded-md mt-15">
      <h2 className="text-3xl font-bold">Create a new account</h2>
      <p className="text-slate-500 font-light ps-3">It is quick and easy.</p>
      <form onSubmit={handleSubmit(handelRegister)} className="space-y-5 my-5">

        <Input {...register('name')} aria-label="Full Name" className="w-full bg-slate-200" placeholder="Enter your Full Name" />

        {errors?.name && (
          <p className="text-red-500">{errors?.name?.message}</p>
        )}

        <Input {...register('username')} aria-label="userName" className="w-full bg-slate-200" placeholder="Enter your User Name" />

        {errors?.username && (
          <p className="text-red-500">{errors?.username?.message}</p>
        )}

        <Input {...register('email')} aria-label="Email" type="email" className="w-full bg-slate-200" placeholder="Enter your Email" />

        {errors?.email && (
          <p className="text-red-500">{errors?.email?.message}</p>
        )}

        <Input {...register('dateOfBirth')} aria-label="Date Of Birth" type="date" className="w-full bg-slate-200" placeholder="Enter your Date" />

        {errors?.dateOfBirth && (
          <p className="text-red-500">{errors?.dateOfBirth?.message}</p>
        )}

        {/* gender */}
        <Controller control={control} name="gender" render={({ field }) => (
          <Select {...field} className="w-full" placeholder="Select gender">
            {/* <Label>Gender</Label> */}
            <Select.Trigger className="bg-slate-200">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-slate-200">
              <ListBox>
                <ListBox.Item id="female" textValue="female">
                  female
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="male" textValue="male">
                  male
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        )} />

        {errors?.gender && (
          <p className="text-red-500">{errors?.gender?.message}</p>
        )}

        <Input {...register('password')} aria-label="Password" type="password" className="w-full bg-slate-200" placeholder="Enter your Password" />

        {errors?.password && (
          <p className="text-red-500">{errors?.password?.message}</p>
        )}

        <Input {...register('rePassword')} aria-label="RePassword" type="password" className="w-full bg-slate-200" placeholder="Enter your RePassword" />

        {errors?.rePassword && (
          <p className="text-red-500">{errors?.rePassword?.message}</p>
        )}

        <Button isDisabled={isLoading} type="submit" className="bg-main w-full text-white">
          {isLoading && (<span>Lodding...</span>)}
          {!isLoading && (<span>Create New Account</span>)}
        </Button>

        <div className="text-center">
          <span>I have an Account ? <Link to={'/auth/login'}>Login</Link></span>
        </div>
      </form>
    </div>
  )
}
