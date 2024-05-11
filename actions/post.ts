"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { uuid } from "edgedb/dist/codecs/ifaces";

const client = createClient();

export async function createPost(profileId: string, content: string) {
  try {
    const profile = await e
      .select(e.Profile, (profile) => ({
        filter_single: e.op(profile.id, "=", e.uuid(profileId)),
      }))
      .run(client);
    if (!profile) {
      return "Profile Not Found";
    }
    const newPost = e.insert(e.Post, {
      content: content as string,
      profile: e.select(e.Profile, (profile) => ({
        filter_single: e.op(profile.id, "=", e.uuid(profileId as uuid)),
      })),
    });
    await newPost.run(client);
    return "Post Created";
  } catch (error) {
    return "Profile Action Error";
  }
}

export async function updatePost(postId: string, content: string) {
  try {
    const post = await e
      .select(e.Post, (post) => ({
        filter_single: e.op(post.id, "=", e.uuid(postId)),
      }))
      .run(client);
    if (!post) {
      return "Post Not Found";
    }
    const updatePost = e.update(e.Post, (post) => ({
      filter_single: e.op(post.id, "=", e.uuid(postId)),
      set: {
        content: content as string,
      },
    }));
    await updatePost.run(client);
    return "Post Updated";
  } catch (error) {
    return "Update Post Action Error";
  }
}

export async function deletePost(postId: string) {
  try {
    const post = await e
      .select(e.Post, (post) => ({
        filter_single: e.op(post.id, "=", e.uuid(postId)),
      }))
      .run(client);
    if (!post) {
      return "Post Not Found";
    }
    const deletePost = e.delete(e.Post, (post) => ({
      filter_single: e.op(post.id, "=", e.uuid(postId)),
    }));
    await deletePost.run(client);
    return "Post Deleted";
  } catch (error) {
    return "Delete Post Action Error";
  }
}
