import axios from "axios"
import { baseUrl } from "../constant/environment"

export async function getAllPosts(token:string){
    const { data } = await axios.request({
        url:`${baseUrl}/posts`,
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}