import { useState, useEffect } from "react";
import type { BlogPost } from "@/data/blog";

const STORAGE_KEY = "blog_admin_posts";

export function useAdminPosts() {
  const [adminPosts, setAdminPosts] = useState<BlogPost[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(adminPosts));
  }, [adminPosts]);

  function addPost(post: BlogPost) {
    setAdminPosts((prev) => [post, ...prev]);
  }

  function deletePost(slug: string) {
    setAdminPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  function updatePost(slug: string, updated: BlogPost) {
    setAdminPosts((prev) => prev.map((p) => (p.slug === slug ? updated : p)));
  }

  return { adminPosts, addPost, deletePost, updatePost };
}

export function getAllAdminPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
