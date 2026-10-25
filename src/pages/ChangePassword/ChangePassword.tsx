import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseUrl } from "../../constant/environment";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { changePasswordSchema } from "../../Schema/ChangePassword.schema";
import { useNavigate } from "react-router-dom";

type ChangePasswordFormData = {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

export default function ChangePassword() {
    const navigate = useNavigate()
    const { userToken, setToken } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    async function handelChangePassword(value: ChangePasswordFormData) {
        setLoading(true);
        try {
            const response = await axios.patch(`${baseUrl}/users/change-password`, {
                password: value.password,
                newPassword: value.newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                }
            });

            if (response?.data?.success === true) {
                if (response.data.data?.token) {
                    setToken(response.data.data.token);
                    localStorage.setItem("token", response.data.data.token);
                }

                toast.success(response.data.message || "Password changed successfully!");
                navigate("/Feed");
            }

            setLoading(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Could not change password");
            } else {
                toast.error("There is an error changing password");
            }
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-10 rounded-md mt-10 mx-auto w-full max-w-lg">
            <h2 className="text-3xl font-bold">Change Password</h2>
            <p className="text-slate-500 font-light ps-3">Update your password and keep your account secure.</p>

            <form onSubmit={handleSubmit(handelChangePassword)} className="space-y-5 my-5">
                <div>
                    <Input {...register("password")} aria-label="Current Password" type="password" className="w-full bg-slate-200" placeholder="Enter your current password" />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>

                <div>
                    <Input {...register("newPassword")} aria-label="New Password" type="password" className="w-full bg-slate-200" placeholder="Enter your new password" />
                    {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
                </div>

                <div>
                    <Input {...register("confirmPassword")} aria-label="Confirm New Password" type="password" className="w-full bg-slate-200" placeholder="Confirm your new password" />
                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <Button isDisabled={isLoading} type="submit" className="bg-main w-full text-white">
                    {isLoading ? <span>Loading...</span> : <span>Change Password</span>}
                </Button>
            </form>
        </div>
    );
}