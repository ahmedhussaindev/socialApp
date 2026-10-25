import type { Comment } from "../../../types/comment.type"
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { deleteComment } from "../../../services/deleteComment.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { userContext } from "../../../context/userDataContext";
import { editComment } from "../../../services/editComment.services";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";


export default function PostComment({ comment, postId, postOwnerId }: { comment: Comment, postId: string, postOwnerId: string }) {

    const { userData } = useContext(userContext);
    const { userToken } = useContext(AuthContext);
    const query = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            content: comment.content,
        },
    });

    async function dleteComment() {
        if (userToken) {
            const response = await deleteComment(userToken, postId, comment._id)
            return response
        }
    }

    async function edtComment(content: string) {
        if (userToken) {
            const response = await editComment(userToken, postId, comment._id, { content })
            return response
        }
    }


    const { mutate: removeComment, isPending } = useMutation({
        mutationFn: dleteComment,
        onSuccess: () => {
            toast.success("Comment deleted successfully");
            query.invalidateQueries({ queryKey: ["allComments", postId] });
            query.invalidateQueries({ queryKey: ["posts"] });
            query.invalidateQueries({ queryKey: ["profilePosts"] });
        },
        onError: () => {
            toast.error("Could not delete comment");
        },
    })

    const { mutate: updateComment, isPending: isUpdating } = useMutation({
        mutationFn: edtComment,
        onSuccess: () => {
            toast.success("Comment updated successfully");
            setIsEditing(false);
            query.invalidateQueries({ queryKey: ["allComments", postId] });
            query.invalidateQueries({ queryKey: ["posts"] });
            query.invalidateQueries({ queryKey: ["profilePosts"] });
        },
        onError: () => {
            toast.error("Could not update comment");
        }
    })

    return (
        <div className="my-3 rounded-2xl bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-slate-800">
            <div className="flex items-start gap-3">
                <img src={comment?.commentCreator.photo} alt="User Avatar" className="h-10 w-10 shrink-0 rounded-full object-cover" />

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">{comment?.commentCreator.name}</p>

                        {(comment.commentCreator._id === userData?._id || postOwnerId === userData?._id) && (
                            <div className="flex shrink-0 items-center gap-1">
                                {comment.commentCreator._id === userData?._id && !isEditing && (
                                    <button type="button" title="Edit comment" onClick={() => { reset({ content: comment.content }); setIsEditing(true); }} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all duration-200 hover:bg-sky-50 hover:text-sky-600 active:scale-90 dark:hover:bg-slate-700">
                                        <MdEdit size={18} />
                                    </button>
                                )}

                                <button type="button" title="Delete comment" disabled={isPending} onClick={() => {
                                    Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to undo this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        cancelButtonColor: "#64748b",
                                        confirmButtonText: "Yes, delete it!",
                                        cancelButtonText: "Cancel",
                                    }).then((result) => {
                                        if (result.isConfirmed) removeComment();
                                    });
                                }} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 active:scale-90 disabled:opacity-50 dark:hover:bg-red-950/30">
                                    <MdDeleteOutline size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit((data) => updateComment(data.content))} className="mt-2 w-full">
                            <textarea {...register("content", { required: true })} placeholder="Edit your comment..." className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white" rows={3} />

                            <div className="mt-2 flex justify-end gap-2">
                                <button type="button" disabled={isUpdating} onClick={() => { reset({ content: comment.content }); setIsEditing(false); }} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-700">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isUpdating} className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 active:scale-95 disabled:opacity-50">
                                    {isUpdating ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mt-1 inline-block max-w-full rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 dark:bg-slate-700">
                            <p className="whitespace-pre-wrap wrap-break-words text-sm leading-6 text-slate-700 dark:text-slate-200">{comment?.content}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
