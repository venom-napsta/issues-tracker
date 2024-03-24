import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

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
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} closed={closed} inProgess={inProgress} />
          <IssueChart open={open} closed={closed} inProgess={inProgress} />
        </Flex>
        <LatestIssues />
      </Grid>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Dashboard | Issue Tracker",
  description:
    "Dashboard for Issue Tracker - View a summary of project issues.",
};
