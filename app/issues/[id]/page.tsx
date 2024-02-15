import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // Check if ID is a number
  // if (typeof parseInt(params.id) !== "number") notFound();

  // FInd Issue Using Clicked ID
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid gap="5" columns={{ initial: "1", md: "2" }}>
      <Box>
        <Heading>{issue.title}</Heading>
        {/* <Flex className="space-x-8">  */}
        <Flex mt="4" my="3" gap={{ initial: "5", md: "3" }}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>

        <Card className="prose mt-4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link
            // className="hover:cursor-pointer"
            href={`/issues/${issue.id}/edit`}
          >
            Edit Issue
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
