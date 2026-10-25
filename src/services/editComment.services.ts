import axios from "axios";
import { baseUrl } from "../constant/environment";

export async function editComment(token: string, postId: string, commentId: string, payload: any) {
    const { data } = await axios.put(`${baseUrl}/posts/${postId}/comments/${commentId}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return data
}