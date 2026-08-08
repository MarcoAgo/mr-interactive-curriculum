export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface GetPostsParams {
  page?: number;
  search?: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
}
