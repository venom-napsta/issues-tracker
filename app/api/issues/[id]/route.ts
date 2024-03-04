import authOptions from "@/app/auth/authOptions";
import { issueSchema, patchIssueSchema } from "@/app/issueValidationSchema";
import prisma from "@/prisma/client";
// import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  params: { id: string };
}

// Edit Issue
export async function PATCH(request: NextRequest, { params }: IParams) {
  if (!params.id)
    NextResponse.json({ error: "Invalid ID provided" }, { status: 404 });

  // const session = await getServerSession(authOptions);
  // if (!session)
  //   return NextResponse.json({ error: "Not authorised" }, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  // Find issue
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: title,
      description: description,
      assignedToUserId: assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

// Delete Issue
export async function DELETE(request: NextRequest, { params }: IParams) {
  // const session = await getServerSession(authOptions);
  // if (!session)
  //   return NextResponse.json({ error: "Not authorised" }, { status: 401 });

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
