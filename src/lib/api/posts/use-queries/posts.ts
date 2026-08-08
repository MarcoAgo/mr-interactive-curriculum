import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPostById, getPosts } from "@/lib/api/posts/posts";
import type { CreatePostPayload, GetPostsParams } from "@/lib/api/posts/posts.types";

export function useGetPosts(params?: GetPostsParams) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
  });
}

export function useGetPostById(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
