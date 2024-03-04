import { z } from "zod";

// Define Data Constraints according to DB config.
export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z
    .string()
    .min(1, "...")
    .max(255, "Max number of charaters is 300"),
});

// assignedToUserID:statua will need values for title and desc
// it wouldn't be flexible for updating some properties
// Hence it should accept diff kinds of data. If edit, properties should be optional
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(500, "Max number of charaters is 500")
    .optional(),

  // If we include it we have to provide a value
  assignedToUserId: z
    .string()
    .min(1, "Assigned To User ID is Required.")
    .max(255, "Max number of charaters is 255")
    .optional()
    .nullable(),
});
