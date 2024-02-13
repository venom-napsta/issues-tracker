import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import delay from "delay";

import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueActions from "./IssueActions";
import Link from "next/link";

const IssuesPage = async () => {
  let issues;
  try {
    issues = await prisma.issue.findMany();
  } catch (error) {
    console.error(error);
  }

  await delay(1500);

  return (
    <div>
      <IssueActions />
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues?.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>
                    {issue.title} {/** Display under Title on small screens */}
                  </Link>
                  {/* <div className="block md:hidden">Status: {issue.status}</div> */}
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell>{issue.description}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                {/** Display only on md> screens */}
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuesPage;
