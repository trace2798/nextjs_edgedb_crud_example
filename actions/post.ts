"use server";
import e, { createClient } from "@/dbschema/edgeql-js";
import { uuid } from "edgedb/dist/codecs/ifaces";
import { NextResponse } from "next/server";

const client = createClient();

export async function createPost(profileId: string, content: string) {
  try {
    // const user = await currentUser();
    console.log(profileId);
    console.log(content);
    const profile = await e
      .select(e.Profile, (profile) => ({
        // id: true,
        filter_single: e.op(profile.id, "=", e.uuid(profileId)),
      }))
      .run(client);
    console.log(profile);
    const newPost = e.insert(e.Post, {
      content: content as string,
      profile: e.select(e.Profile, (profile) => ({
        filter_single: e.op(profile.id, "=", e.uuid(profileId as uuid)),
      })),
    });
    const result = await newPost.run(client);
    console.log(result);
    return "Post Created";
  } catch (error) {
    console.log(error);
    return "Profile Action Error";
  }
}

export async function updatePost(postId: string, content: string) {
  try {
    // const user = await currentUser();
    console.log(postId);
    console.log(content);
    const post = await e
      .select(e.Post, (post) => ({
        // id: true,
        filter_single: e.op(post.id, "=", e.uuid(postId)),
      }))
      .run(client);
    console.log(post);
    const updatePost = e.update(e.Post, (post) => ({
      filter_single: e.op(post.id, "=", e.uuid(postId)),
      set: {
        content: content as string,
      },
    }));
    const result = await updatePost.run(client);
    console.log(result);
    return "Post Updated";
  } catch (error) {
    console.log(error);
    return "Update Post Action Error";
  }
}
