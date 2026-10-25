import axios from "axios";
import { baseUrl } from "../constant/environment";
export async function getUserData(token:string) {

    const { data } = await axios.request({
        url:`${baseUrl}/users/profile-data`,
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}