"use client";

import { Spinner } from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/issueValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import Axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";

// To Disable SSR - Err:navigator not defined. Hence use lazy-loading
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// // Reduntandant Code
// interface IIssueForm {
//   title: string;
//   description: string;
// }

// Pro Code: Infer based on this schema
type IIssueFormData = z.infer<typeof createIssueSchema>;

interface Props {
  issue?: Issue;
}

function IssueForm({ issue }: Props) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IIssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  console.log("Errors", errors);

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
            defaultValue={issue?.title}
            {...register("title")}
            placeholder="Title"
            size="3"
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
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

export default IssueForm;
