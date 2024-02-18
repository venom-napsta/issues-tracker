import { issueSchema } from "@/app/issueValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: { id: string };
}

// Edit Issue
export async function PATCH(request: NextRequest, { params }: IParams) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Find issue
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue?.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

// Delete Issue
export async function DELETE(request: NextRequest, { params }: IParams) {
  request = request;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({});
}
