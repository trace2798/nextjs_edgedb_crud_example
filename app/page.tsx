import { getProfile } from "@/actions/profile";
import CreatePost from "@/components/create-post";
import DisplayAllPosts from "@/components/display-all-post";
import e, {createClient} from "@/dbschema/edgeql-js";
import { currentUser } from "@clerk/nextjs/server";
// import createClient from "edgedb";
const client = createClient();

export default async function Home() {
  const user = await currentUser();
  const profile = await getProfile(user?.id as string);

  const posts = await e
    .select(e.Post, (_post) => ({
      id: true,
      content: true,
      created: true,
      profile: {
        id: true,
        name: true,
        imageUrl: true,
      },
      order_by: {
        expression: _post.created,
        direction: e.DESC,
      },
    }))
    .run(client);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 ">
      <CreatePost profileId={(profile as { id: string })?.id} />
      <DisplayAllPosts posts={posts} />
    </main>
  );
}