import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import Link from "next/link";
import EditPostDialog from "./edit-post-dialog";

interface DisplayAllPostsByProfileIdProps {
  posts: any[];
  currentUserId: string;
}

const DisplayAllPostsByProfileId: FC<DisplayAllPostsByProfileIdProps> = ({
  posts,
  currentUserId,
}) => {
  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className="w-2/3">
          <Card className="border border-none">
            <CardHeader>
              <Link
                href={`/profile/${post.profile.id}`}
                className="hover:cursor-pointer"
              >
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
              </Link>
            </CardHeader>
            <CardContent className="text-xl font-thin">
              {post.content}
            </CardContent>
            {currentUserId === post.profile.userId && (
              <CardFooter className="w-full flex justify-between">
                {/* <Button variant={"secondary"} size={"icon"}>
                  <Pencil className="h-5 w-5" />
                </Button> */}
                <EditPostDialog post={post}/>
                <Button variant={"destructive"} size={"icon"}>
                  <Trash className="h-5 w-5" />
                </Button>
              </CardFooter>
            )}
          </Card>
          <Separator />
        </div>
      ))}
    </>
  );
};

export default DisplayAllPostsByProfileId;

// 05-11-2024 13:36:11