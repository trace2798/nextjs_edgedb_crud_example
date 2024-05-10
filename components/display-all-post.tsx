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
      {posts.map((post, index) => (
        <div key={index} className="w-2/3">
          <Card className="border border-none">
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
            <CardContent className="text-xl font-thin">
              {post.content}
            </CardContent>
          </Card>
          <Separator />
        </div>
      ))}
    </>
  );
};

export default DisplayAllPosts;
