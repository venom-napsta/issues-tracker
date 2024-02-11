import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = async () => {
  let issues;
  try {
    issues = await prisma.issue.findMany();
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <div className="mb-5">
        <Button variant="outline" size="4">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
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
                  {issue.title} {/** Display under Title on small screens */}
                  <div className="block md:hidden">Status: {issue.status}</div>
                </Table.Cell>
                <Table.Cell>{issue.description}</Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.status}
                </Table.Cell>
                {/** Display only on md> screens */}
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toString()}
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
