import { Button, Dropdown, Label } from "@heroui/react";
import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs"
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";
import { deletePost } from "../../../services/deletePost.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { editPost } from "../../../services/editPost.services";
import { useRef } from "react";
import { FiPaperclip } from "react-icons/fi";
import { useForm } from "react-hook-form";

export default function DropDownList({ postId, postBody }: { postId: string, postBody: string }) {

    const { userToken } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const inputFile = useRef<HTMLInputElement>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const { register, handleSubmit, reset: resetForm } = useForm({
        defaultValues: {
            body: postBody,
        }
    })

    async function dletePost() {
        if (userToken) {
            const response = await deletePost(userToken, postId)
            return response
        }
    }


    function sendData(data: any) {
        const fd = new FormData();

        fd.append("body", data.body);

        if (image) {
            fd.append("image", image);
        }

        updatePost(fd);
    }

    async function edtPost(fd: any) {
        if (userToken) {
            return await editPost(userToken, postId, fd);
        }
    }

    const query = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: dletePost,
        onSuccess: (res) => {
            toast.success(res.data.message)
            query.invalidateQueries({ queryKey: ['posts'] })
            query.invalidateQueries({ queryKey: ['profilePosts'] })
        }
    })

    const { mutate: updatePost, isPending } = useMutation({
        mutationFn: edtPost,
        onSuccess: () => {
            toast.success("Post updated successfully")
            setIsEditing(false);

            query.invalidateQueries({ queryKey: ["posts"] })
            query.invalidateQueries({ queryKey: ["profilePosts"] })
        },

        onError: () => {
            toast.error("Could not update post")
        },
    })

    return (
        <>
            <Dropdown>
                <Button aria-label="Menu" variant="secondary">
                    <BsThreeDots />
                </Button>
                <Dropdown.Popover>
                    <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                        <Dropdown.Item onClick={() => { resetForm({ body: postBody }); setImage(null); setImgSrc(null); setIsEditing(true); }} className="flex items-center justify-between" id="edit-post" textValue="Edit post">
                            <Label>Edit Post</Label><MdEdit size={16} />
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { mutate() }} className="flex items-center justify-between" id="delete-post" textValue="Delete post" variant="danger">
                            <Label>Delete Post</Label><MdDelete color="red" size={16} />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <form onSubmit={handleSubmit(sendData)} className="w-full max-w-lg space-y-4 rounded-xl bg-white p-5">
                        <h2 className="text-xl font-bold">Edit Post</h2>
                        <textarea {...register("body")} className="min-h-32 w-full rounded-lg border p-3" placeholder="Edit your post..." />
                        <div className="icons flex text-gray-500 m-2">
                            <input ref={inputFile} type="file" accept="image/*" hidden onChange={(event) => { const file = event.target.files?.[0]; if (file) { setImage(file); setImgSrc(URL.createObjectURL(file)); } }} />
                            <FiPaperclip onClick={() => { inputFile.current?.click(); }} className="mr-2 cursor-pointer rounded-full border p-1 h-7 w-7 hover:text-gray-700" />
                        </div>
                        {imgSrc && <img className="w-50 rounded-md border border-slate-600" src={imgSrc} alt="Selected image" />}
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setIsEditing(false)} className="rounded-md border px-4 py-2">
                                Cancel
                            </button>
                            <button type="submit" disabled={isPending} className="rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-50">
                                {isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
