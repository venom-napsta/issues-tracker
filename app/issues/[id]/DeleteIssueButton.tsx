"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface IIssueId {
  issueId: number;
}
const DeleteIssueButton = ({ issueId }: IIssueId) => {
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Revoke access</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This action cannot be undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red">
                Revoke access
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <Button color="red">
        <TrashIcon />
        <Link href={`/issues`}>Delete Issue {issueId}</Link>
      </Button>
    </>
  );
};

export default DeleteIssueButton;
