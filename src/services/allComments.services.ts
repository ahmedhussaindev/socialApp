import axios from "axios"
import { baseUrl } from "../constant/environment"

export async function getAllComments(token:string,postId:string){
    const { data } = await axios.request({
        url:`${baseUrl}/posts/${postId}/comments?page=1&limit=10`,
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data.data
}