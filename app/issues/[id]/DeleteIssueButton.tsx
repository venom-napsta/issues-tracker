"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import Axios from "axios";
import { useRouter } from "next/navigation";

interface IIssueId {
  issueId: number;
}
const DeleteIssueButton = ({ issueId }: IIssueId) => {
  const router = useRouter();
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <TrashIcon /> Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
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
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  await Axios.delete(
                    `http://localhost:3000/api/issues/${issueId}`
                  );
                  router.push("/issues");
                  router.refresh();
                }}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
