import axios from "axios"
import { baseUrl } from "../constant/environment"

export async function getUserPosts(token:string,userId:string){
    const { data } = await axios.request({
        url:`${baseUrl}/users/${userId}/posts`,
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data.data
}