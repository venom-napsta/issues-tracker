import { Button } from "@radix-ui/themes";

interface IIssueId {
  issueId: number;
}
const DeleteIssueButton = ({ issueId }: IIssueId) => {
  return <Button color="red">Delete Issue {issueId}</Button>;
};

export default DeleteIssueButton;
