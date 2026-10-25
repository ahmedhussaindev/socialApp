import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../context/AuthContext";
import { getAllPosts } from "../../services/allPosts.services";
import type { PostItem } from "../../types/post.type";
import Post from "../../component/Post/Post";
import CreatePost from "../../component/SharedComponent/CreatePost/CreatePost";
import Sidebar from "../../component/SideBar/SideBar";
import Loading from "../../component/SharedComponent/Loading/Loading";

export default function NewsFeed() {
  const { userToken } = useContext(AuthContext);

  async function AllPosts() {
    try {
      if (userToken) {
        const { data } = await getAllPosts(userToken);
        return data;
      }

      return { posts: [] };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data.message ||
          "There is an error, could not fetch posts..."
        );
      }
      throw err;
    }
  }

  const { data, isLoading, isError, error, } = useQuery({
    queryFn: AllPosts,
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    select: (data) => data?.posts as PostItem[] | undefined,
    enabled: !!userToken,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <p className="p-5 text-red-700">
        {error.message || "Failed to load posts"}
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>News Feed</title>
      </Helmet>

      <div className="container mx-auto my-6 w-full px-4 lg:my-8 lg:w-[95%]">
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          {/* Left Sidebar */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          {/* Main Feed */}
          <main className="min-w-0 lg:col-span-6">
            <CreatePost />
            <Post posts={data ?? []} />
          </main>

          {/* Right Sidebar */}
          <aside className="hidden space-y-4 lg:col-span-3 lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-white">
                  Trending topics
                </h3>

                <div className="mt-4 space-y-4">
                  <div className="transition-transform duration-200 hover:translate-x-1">
                    <p className="text-sm font-semibold text-sky-600">
                      # WebDevelopment
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Explore new technologies
                    </p>
                  </div>

                  <div className="transition-transform duration-200 hover:translate-x-1">
                    <p className="text-sm font-semibold text-sky-600">
                      # Programming
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Share what you're building
                    </p>
                  </div>

                  <div className="transition-transform duration-200 hover:translate-x-1">
                    <p className="text-sm font-semibold text-sky-600">
                      # Community
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Discover new perspectives
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-linear-to-br from-sky-600 to-blue-700 p-5 text-white shadow-md shadow-sky-600/20 transition-shadow duration-300 hover:shadow-lg">
                <h3 className="font-bold">Have something to share?</h3>
                <p className="mt-2 text-sm leading-6 text-sky-50">
                  Your next post could start a great conversation.
                </p>
              </div>

              <p className="px-2 text-xs leading-6 text-slate-400">
                About · Privacy · Terms · Community
                <span className="block">© 2026 Your Social Space</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}