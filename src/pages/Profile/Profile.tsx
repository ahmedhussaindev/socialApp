import { useContext } from "react"
import { userContext } from "../../context/userDataContext"
import { getUserPosts } from "../../services/userPosts.services"
import { AuthContext } from "../../context/AuthContext"
import { useQuery } from "@tanstack/react-query"
import Loading from "../../component/SharedComponent/Loading/Loading"
import type { PostItem } from "../../types/post.type"
import PostCard from "../../component/SharedComponent/PostCard/PostCard"
import CreatePost from "../../component/SharedComponent/CreatePost/CreatePost"
import { Helmet } from "react-helmet"

export default function Profile() {

  const { userData } = useContext(userContext)
  const { userToken } = useContext(AuthContext)

  async function getPosts() {
    if (userToken) {
      const response = await getUserPosts(userToken, userData?.id!)
      return response.posts
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: getPosts,
    queryKey: ['profilePosts']
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h2 className="text-red-700">There is an error...</h2>
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="h-full bg-gray-200 p-8">
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="w-full h-62.5">
            <img src={userData?.cover ? userData.cover : "https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"} className="w-full h-full rounded-tl-lg rounded-tr-lg" />
          </div>
          <div className="flex flex-col items-center -mt-20">
            <img src={userData?.photo} className="w-40 border-4 border-slate-200 rounded-full" />
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{userData?.name}</p>
              <span className="bg-blue-500 rounded-full p-1" title="Verified">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </div>
            <p className="text-gray-700">{userData?.username}</p>
            <p className="text-sm text-gray-500">{userData?.email}</p>
          </div>
        </div>
        <CreatePost />
        {data && data.map((post: PostItem) => <PostCard key={post._id} post={post} showDetails={true} />)}
      </div>
    </>
  )
}
