"use client";

import { createPost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "content must be at least 10 characters.",
    })
    .max(160, {
      message: "content must not be longer than 30 characters.",
    }),
});

export function TextareaForm({ profileId }: { profileId: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await createPost(profileId, data.content);
    if (response === "Post Created") {
      toast.success("Post Created");
      form.reset();
      router.refresh();
    } else {
      toast.error(response);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-2/3 space-y-6 mb-5"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="What's on your mind?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Post</Button>
      </form>
    </Form>
  );
}
