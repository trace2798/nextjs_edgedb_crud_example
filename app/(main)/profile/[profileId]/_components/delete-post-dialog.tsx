"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash } from "lucide-react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deletePost, updatePost } from "@/actions/post";

const DeletePostDialog = ({ post }: { post: any }) => {
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    const response = await deletePost(postId);
    if (response === "Post Deleted") {
      toast.success("Post Deleted");
      router.refresh();
    } else {
      toast.error("Error Updating Post");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            This is to show Delete functionality using edgedb.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Are you sure want to delete post: {post.id}? Action cannot be
              undone
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleDelete(post.id)} variant={"destructive"}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostDialog;
