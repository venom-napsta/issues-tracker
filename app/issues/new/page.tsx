"use client";

import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

function NewIssuePage() {
  return (
    <div className="max-w-xl px-5 space-y-3">
      <Text size="4">New Issue</Text>
      <TextField.Root className="px-2">
        <TextField.Slot></TextField.Slot>
        <TextField.Input placeholder="Title" size="3" />
      </TextField.Root>
      <TextArea placeholder="Description..." size="3" />
      <Button variant="classic" size="3">
        Submit New Issue
      </Button>
    </div>
  );
}

export default NewIssuePage;
