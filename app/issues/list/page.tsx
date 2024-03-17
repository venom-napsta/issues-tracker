import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";

import { IssueStatusBadge, LinkComponent } from "../../components";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  let issues;
  try {
    // console.log(searchParams.status);
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;
    issues = await prisma.issue.findMany({
      where: {
        status: status,
      },
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <IssueActions />
      <div>
        <Table.Root variant="surface" size="3">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
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
              <Table.Row key={issue.id} className="hover:bg-[#efeeee97]">
                <Table.Cell>
                  <LinkComponent href={`/issues/${issue.id}`}>
                    {/** Display under Title on small screens */}
                    {issue.title}
                  </LinkComponent>
                  {/* <div className="block md:hidden">Status: {issue.status}</div> */}
                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
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
