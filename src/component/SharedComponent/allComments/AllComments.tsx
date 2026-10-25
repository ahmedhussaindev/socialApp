import { useContext } from "react";
import { getAllComments } from "../../../services/allComments.services";
import PostComment from "../postComment/PostComment";
import { AuthContext } from "../../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import type { Comment } from "../../../types/comment.type";

export default function AllComments({ postId, postOwnerId }: { postId: string; postOwnerId: string }) {

    const { userToken } = useContext(AuthContext)

    async function getComments() {
        if (userToken) {
            const response = await getAllComments(userToken, postId)
            return response
        }
    }

    const { data } = useQuery({
        queryFn: getComments,
        queryKey: ["allComments", postId],
        enabled: !!userToken && !!postId,
    })

    return (
        <div>
            {data?.comments.map((comment: Comment) => {
                return <PostComment comment={comment} postId={postId} postOwnerId={postOwnerId} />
            })}
        </div>
    )
}