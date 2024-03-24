import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgess: number;
  closed: number;
}

const IssueSummary = ({ open, inProgess, closed }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgess, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {statuses.map((status) => (
        <Card className="hover:bg-gray-100" key={status.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
              href={`/issues/list?status=${status.status}`}
            >
              {status.status}
            </Link>
            <Text size="5" className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
