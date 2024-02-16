import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../issueValidationSchema";

// Create New Issue
export async function POST(request: NextRequest) {
  const body = await request.json();
  // use schema to validate body obj
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // save issue
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

// Get All Issues
// export async function GET(request: NextRequest) {
//   const issues = await prisma.issue.findMany();
//   return NextResponse.json(issues, { status: 200 });
// }
