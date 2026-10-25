import axios from "axios";
import { baseUrl } from "../constant/environment";

export async function deleteComment(token: string, postId: string, commentId: string) {
    const { data } = await axios.delete(`${baseUrl}/posts/${postId}/comments/${commentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return data;
}
