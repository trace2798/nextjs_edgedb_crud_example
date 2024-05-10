import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatRelative, subDays, toDate } from "date-fns";
import { Separator } from "./ui/separator";

interface DisplayAllPostsProps {
  posts: any[];
}

const DisplayAllPosts: FC<DisplayAllPostsProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <>
          <Card key={post.id} className="border border-none w-2/3">
            <CardHeader>
              <CardTitle className="flex text-base">
                <div>
                  <Avatar>
                    <AvatarImage src={post.profile.imageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="w-full flex justify-between ml-3">
                  <h1>{post.profile.name}</h1>
                  <h1>
                    {" "}
                    {format(new Date(post.created), "MM-dd-yyyy HH:mm:ss")}
                  </h1>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
          </Card>
          <Separator />
        </>
      ))}
    </>
  );
};

export default DisplayAllPosts;
