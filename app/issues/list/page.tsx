import prisma from "@/prisma/client";

import Pagination from "@/app/components/Pagination";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IIssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IIssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // console.log(searchParams.status);
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columnNames
    // .map((column) => column.value) // Done in Table & Exported.
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    // Dynamic Update
    orderBy,
    // Const Update
    // orderBy: {
    //   // title:'asc'
    //   [searchParams.orderBy]: "asc",
    // },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <div>
        <IssueTable issues={issues} searchParams={searchParams} />
      </div>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuesPage;
// export const dynamic = 'force-dynamic';
