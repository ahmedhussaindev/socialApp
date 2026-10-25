import { useParams } from "react-router-dom"
import { getSinglePosts } from "../../services/singlePost.services";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../component/SharedComponent/Loading/Loading";
import PostCard from "../../component/SharedComponent/PostCard/PostCard";

export default function PostDetails() {
    const { userToken } = useContext(AuthContext)
    let { postId } = useParams<{ postId: string | undefined }>();

    async function getDetails() {
        try {
            if (userToken && postId) {
                const { data } = await getSinglePosts(userToken, postId)
                return data.post
            }
        } catch (err) {

        }
    }

    const { data, isLoading, isError, error } = useQuery({
        queryFn: getDetails,
        queryKey: ['postDetails', postId]
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <p className="text-red-700">{error.message}</p>
    }

    console.log(data)

    return (
        <div className="flex justify-center">
            <PostCard post={data} showDetails={false} />
        </div>
    )
}
