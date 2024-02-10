import { z } from "zod";

// Define Data Constraints according to DB config.
export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(300, "Max number of charaters is 300"),
});
