"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import React from "react";
import Skeleton from "@/app/components/SkeletonComponent";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => Axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60, // 1 minute
    // retry: 0, // 0 re-tries
  });

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

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => {
          Axios.patch("/api/issues/" + issue.id, {
            assignedToUserId: userId === "unassigned" ? null : userId,
          });
        }}
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
    </>
  );
};

export default AssigneeSelect;
