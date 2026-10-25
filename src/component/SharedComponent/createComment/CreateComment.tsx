import { Button, Input } from "@heroui/react";
import { FiSend } from "react-icons/fi"
import { FaRegImages } from "react-icons/fa6"
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { createComment } from "../../../services/createComment.service";
import { AuthContext } from "../../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CreateComment({ postId }: { postId: string }) {

    const { userToken } = useContext(AuthContext)

    const [imgFile, setImgFile] = useState(null)

    const { register, handleSubmit, reset: resetForm } = useForm({
        defaultValues: {
            content: '',
        }
    })

    const inputFile = useRef<HTMLInputElement | null>(null)

    function getFileImage(e: any) {
        setImgFile(e.target.files[0])
    }

    async function createCommentPost(fd: any) {
        if (userToken) {
            return await createComment(userToken, postId, fd)
        }
    }

    const query = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: createCommentPost,
        onSuccess: (response) => {
            toast.success(response.message)
            setImgFile(null)
            resetForm()
            query.invalidateQueries({ queryKey: ['posts'] })
            query.invalidateQueries({ queryKey: ['allComments'] })
            query.invalidateQueries({ queryKey: ['profilePosts'] })
        },
        onError: (err) => {
            toast.error(err.message || 'there is an error')
        }
    })

    function onSubmit(data: any) {
        if (!data.content && !imgFile) return

        const fd = new FormData()
        if (data.content) {
            fd.append('content', data.content)
        }
        if (imgFile) {
            fd.append('image', imgFile)
        }

        mutate(fd)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md focus-within:border-sky-400 focus-within:shadow-md focus-within:shadow-sky-500/10 dark:border-slate-600 dark:bg-slate-800">
                <Input
                    {...register("content")}
                    type="text"
                    className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-slate-400"
                    placeholder="Write a comment..." />

                <input onChange={getFileImage} ref={inputFile} type="file" accept="image/*" hidden />

                <button
                    type="button"
                    onClick={() => inputFile.current?.click()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-sky-50 hover:text-sky-600 active:scale-90 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    <FaRegImages size={21} />
                </button>

                <Button
                    isDisabled={isPending}
                    type="submit"
                    isIconOnly
                    className="h-10 w-10 min-w-10 shrink-0 bg-linear-to-br from-sky-500 to-blue-700 text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-90 disabled:opacity-50"
                >
                    <FiSend size={18} />
                </Button>
            </div>
        </form>
    )
}
