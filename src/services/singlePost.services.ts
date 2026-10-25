import axios from "axios"
import { baseUrl } from "../constant/environment"

export async function getSinglePosts(token:string,postId:string){
    const { data } = await axios.request({
        url:`${baseUrl}/posts/${postId}`,
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}