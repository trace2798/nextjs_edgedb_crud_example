import { FC } from "react";
import { Textarea } from "./ui/textarea";
import { TextareaForm } from "./textarea-form";

interface CreatePostProps {
  profileId: string | null;
}

const CreatePost: FC<CreatePostProps> = ({ profileId }) => {
  console.log(profileId);
  return (
    <>
      {profileId ? (
        <>
          <TextareaForm profileId={profileId} />
        </>
      ) : (
        <Textarea className="w-2/3" placeholder="Login to Post" disabled />
      )}
    </>
  );
};

export default CreatePost;
