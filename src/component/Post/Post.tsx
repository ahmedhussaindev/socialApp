import type { PostItem } from "../../types/post.type";
import PostCard from "../SharedComponent/PostCard/PostCard";

type PostProps = {
  posts: PostItem[];
};

export default function Post({ posts }: PostProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          showDetails={true}
        />
      ))}
    </div>
  );
}