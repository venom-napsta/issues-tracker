import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });

  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <div className="mt-30">
      <LatestIssues />
      <IssueSummary open={open} closed={closed} inProgess={inProgress} />
      <IssueChart open={open} closed={closed} inProgess={inProgress} />
    </div>
  );
}
