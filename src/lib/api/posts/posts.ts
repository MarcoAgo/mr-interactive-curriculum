import { env } from "@/lib/env";
import { fetchWithAuth } from "@/lib/api/auth/_helpers/auth.helpers";
import { buildQueryString } from "@/lib/api/_helpers/query-string-builder";
import { parseJsonResponse } from "@/lib/api/_helpers/response.helpers";
import type { CreatePostPayload, GetPostsParams, Post } from "./posts.types";

export async function getPosts(params?: GetPostsParams): Promise<Post[]> {
  const query = buildQueryString(params);
  const response = await fetchWithAuth(`${env.VITE_API_URL}/posts?${query}`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return parseJsonResponse<Post[]>(response);
}

export async function getPostById(id: string): Promise<Post> {
  const response = await fetchWithAuth(`${env.VITE_API_URL}/posts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  return parseJsonResponse<Post>(response);
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const response = await fetchWithAuth(`${env.VITE_API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to create post");
  return parseJsonResponse<Post>(response);
}
