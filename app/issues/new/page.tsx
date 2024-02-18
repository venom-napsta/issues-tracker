import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

// SO both fields will render dynamically
// To Disable SSR - Err:navigator not defined. Hence use lazy-loading
const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false, // needed for our FE editing
  loading: () => <IssueFormSkeleton />,
});
const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
