import e, { createClient } from "@/dbschema/edgeql-js";
import { auth } from "@clerk/nextjs/server";
import { FC } from "react";
import DisplayAllPostsByProfileId from "./_components/display-post-profile-id";

interface PageProps {
  params: {
    profileId: string;
  };
}

const client = createClient();

const Page: FC<PageProps> = async ({ params }) => {
  const { userId } = auth();
  const posts = await e
    .select(e.Post, (_post) => ({
      id: true,
      content: true,
      created: true,
      updated: true,
      profile: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
      },
      filter: e.op(_post.profile.id, "=", e.uuid(params.profileId)),
      order_by: {
        expression: _post.created,
        direction: e.DESC,
      },
    }))
    .run(client);
  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-24">
        <DisplayAllPostsByProfileId
          posts={posts}
          currentUserId={userId as string}
        />
      </div>
    </>
  );
};

export default Page;
