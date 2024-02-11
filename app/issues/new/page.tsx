"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import Axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/issueValidationSchema";
import { z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";

// // Reduntandant Code
// interface IIssueForm {
//   title: string;
//   description: string;
// }

// Pro Code: Infer based on this schema
type IIssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  console.log(errors);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      // createIssue(data) how ever it's a simple component.
      await Axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      // console.error(error);
      setIsSubmitting(false);
      setError("An unexpected error occured");
    }
  });

  return (
    <div className="max-w-xl px-5 space-y-3">
      {error && (
        <Callout.Root color="red" className="my-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <Text size="4">New Issue</Text>
        <TextField.Root className="px-2 mb-5">
          <TextField.Input
            {...register("title")}
            placeholder="Title"
            size="3"
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} variant="classic" size="3">
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
