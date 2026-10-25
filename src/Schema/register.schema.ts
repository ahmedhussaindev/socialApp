import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty('name is required').min(3, 'min length is 3 chracter').max(10, 'max length is 10 chracter'),
    username: z.string().nonempty('name is required'),
    email: z.string().nonempty('email is required'),
    dateOfBirth: z.string().nonempty('Date is Required').refine((date) => {
        let currentYear = new Date().getFullYear();
        let selectedYear = new Date(date).getFullYear();
        let age = currentYear - selectedYear;
        return age >= 18
    },'Age not Allowed less than 18 years old'),
    password: z.string().regex(/^.{8,}$/, 'Enter avalid password'),
    rePassword: z.string().nonempty('confirm password is required'),
    gender: z.enum(['female', 'male'], 'choose female or male')
}).refine((data)=>{
    return data.password === data.rePassword
},{
    message:'confirm password and password not matched',
    path:['rePassword']
})