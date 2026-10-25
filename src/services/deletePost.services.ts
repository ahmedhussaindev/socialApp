import axios from "axios"
import { baseUrl } from "../constant/environment"

export async function deletePost(token: string, postId: string) {
    const { data } = await axios.delete(`${baseUrl}/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}