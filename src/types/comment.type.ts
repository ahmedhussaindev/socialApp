export type Comment =  {
  _id: string
  content: string
  image: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
}

export type CommentCreator = {
  _id: string
  name: string
  username: string
  photo: string
}