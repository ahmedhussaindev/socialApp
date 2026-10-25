import axios from "axios"
import { baseUrl } from "../constant/environment"

export async function createComment(token:string,postId:string,payload:any){
    const { data } = await axios.post(`${baseUrl}/posts/${postId}/comments`,payload,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}