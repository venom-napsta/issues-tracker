"use client";

import Skeleton from "@/app/components/SkeletonComponent";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  // Replaced with Tanstack Query
  // const [users, setUsers] = useState<User[] | null>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await Axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);

  const assignIssue = async (userId: string) => {
    await Axios.patch("/api/issues/" + issue.id, {
      assignedToUserId: userId === "unassigned" ? null : userId,
    }).catch((err) => {
      toast.error(err.response?.data?.message || "Failed to update issue");
    });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user?.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => Axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
    // retry: 0, // 0 re-tries
  });

export default AssigneeSelect;
