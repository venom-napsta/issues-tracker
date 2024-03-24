import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

// Hence we'll query the DB Once :)
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  // Check if ID is a number
  // if (typeof parseInt(params.id) !== "number") notFound();

  // FInd Issue Using Clicked ID
  // const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) }});
  // Better Way:Pro way :)
  const issue = await fetchUser(parseInt(params.id));
  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", sm: "5" }}>
      {/* NB: MD in Radix === LG in tailwind */}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  // const issue = await prisma.issue.findUnique({
  //   where: { id: parseInt(params.id) },
  // });
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: `${issue?.title}: Issue Tracker`,
    description: `Details of Issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
