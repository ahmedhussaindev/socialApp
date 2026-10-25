import axios from "axios";
import { baseUrl } from "../constant/environment";

export async function editPost(token: string, postId: string, payload: any) {
    const { data } = await axios.put(`${baseUrl}/posts/${postId}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return data
}