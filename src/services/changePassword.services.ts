import axios from "axios";
import { baseUrl } from "../constant/environment";

export async function changePassword(token: string, payload: { password: string; newPassword: string }) {
    const { data } = await axios.patch(`${baseUrl}/users/change-password`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
}