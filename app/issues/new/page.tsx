"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import Axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

interface IIssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IIssueForm>();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl px-5 space-y-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await Axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            // console.error(error);
            setError("An unexpected error occured");
          }
        })}
      >
        <Text size="4">New Issue</Text>
        <TextField.Root className="px-2 mb-5">
          <TextField.Input
            {...register("title")}
            placeholder="Title"
            size="3"
          />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />

        <Button variant="classic" size="3">
          Submit New Issue
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
