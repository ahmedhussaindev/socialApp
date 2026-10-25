import { useContext, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { FiSend } from "react-icons/fi"
import { createPost } from "../../../services/createPost.services"
import { AuthContext } from "../../../context/AuthContext"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { FaRegImages } from "react-icons/fa"

export default function CreatePost() {
    const { userToken } = useContext(AuthContext)
    const [imgFile, setImgFile] = useState<File | null>(null)
    const [imgSrc, setImg] = useState('')

    const { register, handleSubmit, reset: resetForm } = useForm({
        defaultValues: {
            body: '',
        }
    })

    const inputFile = useRef<HTMLInputElement | null>(null)


    function getImgeFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (file) {
            setImgFile(file);
            setImg(URL.createObjectURL(file));
        }
    }

    async function createPostData(fd: any) {
        if (userToken) {
            return await createPost(userToken, fd)
        }
    }

    const query = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: createPostData,
        onSuccess: (response) => {
            toast.success(response.message)
            setImg('')
            setImgFile(null)
            resetForm()
            query.invalidateQueries({ queryKey: ['posts'] })
            query.invalidateQueries({ queryKey: ['profilePosts'] })
        },
        onError: () => {
            toast.error('coudenot create post')
        }
    })

    function sendData(data: any) {
        if (!imgFile && !data.body) return

        const fd = new FormData()

        if (imgFile) {
            fd.append('image', imgFile)
        }
        if (data.body) {
            fd.append('body', data.body)
        }

        mutate(fd)
    }

    return (
        <>
            <form onSubmit={handleSubmit(sendData)}>
                <div className="mx-auto mt-4 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
                    <textarea
                        {...register("body")}
                        className="min-h-32 w-full resize-y rounded-xl bg-slate-50 p-3 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500/30 dark:bg-slate-700 dark:text-white"
                        spellCheck={false}
                        placeholder="Describe everything about this post here"
                    />

                    <div className="flex items-center justify-between">
                        <input onChange={getImgeFile} ref={inputFile} type="file" hidden />

                        <button
                            type="button"
                            onClick={() => inputFile.current?.click()}
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-sky-50 hover:text-sky-600 active:scale-90 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            <FaRegImages size={21} />
                        </button>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={isPending}
                                type="submit"
                                className="flex items-center gap-2 rounded-xl bg-linear-to-br from-sky-500 to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50"
                            >
                                <FiSend />
                                Send
                            </button>
                        </div>
                    </div>

                    {imgSrc && (
                        <img
                            className="max-h-72 w-full rounded-2xl border-3 border-blue-300  object-fill shadow-2xl shadow-blue-50"
                            src={imgSrc}
                            alt="Post image"
                        />
                    )}
                </div>
            </form>
        </>
    )
}