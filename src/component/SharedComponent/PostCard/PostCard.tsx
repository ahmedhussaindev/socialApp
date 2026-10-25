import { Link } from "react-router-dom";
import type { PostItem } from "../../../types/post.type";
import { FaHeart } from "react-icons/fa"
import PostComment from "../postComment/PostComment";
import AllComments from "../allComments/AllComments";
import CreateComment from "../createComment/CreateComment";
import { Earth } from "lucide-react";
import DropDownList from "../dropDownList/DropDownList";
import { useContext } from "react";
import { userContext } from "../../../context/userDataContext";

export default function PostCard({ post, showDetails }: { post: PostItem, showDetails: boolean }) {

    const { userData } = useContext(userContext)

    function getTimeAgo(date: string) {
        const seconds = Math.floor(
            (Date.now() - new Date(date).getTime()) / 1000
        );

        if (seconds < 60) return "Just now";

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d ago`;

        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;

        const years = Math.floor(days / 365);
        return `${years}y ago`;
    }

    return (
        <>
            <div className="my-5 mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 dark:border-slate-700 dark:bg-gray-800">
                <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <img src={post?.user?.photo} alt="User Avatar" className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-blue-50 dark:ring-slate-700 sm:h-12 sm:w-12" />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-base">{post?.user?.name}</p>
                                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                                    <span>{getTimeAgo(post.createdAt)}</span><span>·</span><Earth size={13} /><span>Public</span>
                                </div>
                            </div>
                        </div>
                        {post.user._id === userData?._id && <div className="shrink-0 rounded-full transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-700"><DropDownList postId={post._id} postBody={post.body} /></div>}
                    </div>

                    <div className="py-4">
                        <p className="whitespace-pre-wrap wrap-break-words text-[14px] leading-7 text-slate-700 dark:text-slate-200 sm:text-[15px]">{post?.body}</p>
                    </div>

                    {post?.image && <div className="mb-4 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900"><img src={post.image} alt="Post content" loading="lazy" className="max-h-125 w-full object-contain sm:object-cover" /></div>}

                    <div className="flex items-center justify-between gap-3 pb-3 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                        <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-950"><FaHeart size={12} /></span><span>{post?.likesCount} likes</span></div>
                        <div className="flex flex-wrap items-center justify-end gap-2"><span>{post?.commentsCount} comments</span><span className="text-slate-300">·</span><span>{post?.sharesCount} shares</span></div>
                    </div>

                    {showDetails && <div className="pt-2"><Link className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition-all duration-300 ease-out hover:bg-blue-50 hover:text-blue-700 active:scale-95 dark:text-blue-400 dark:hover:bg-blue-950/40" to={`/postDetails/${post?._id}`}><span className="transition-transform duration-300 group-hover:translate-x-0.5">View all details</span><span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span></Link></div>}

                    <div className="pt-3"><CreateComment postId={post?._id} /></div>

                    {post.topComment && showDetails && <div className="mt-2 pt-2"><PostComment comment={post.topComment} postId={post._id} postOwnerId={post.user._id} /></div>}

                    {!showDetails && <div className="mt-2 pt-2"><AllComments postId={post._id} postOwnerId={post.user._id} /></div>}
                </div>
            </div>
        </>
    )
}
