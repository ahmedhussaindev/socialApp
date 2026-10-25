import axios from "axios"
import { baseUrl } from "../constant/environment"

export async function createPost(token:string,payload:any){
    const { data } = await axios.post(`${baseUrl}/posts`,payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}