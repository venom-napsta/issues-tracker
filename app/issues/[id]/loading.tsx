import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingIssuePage = () => {
  return (
    <Box>
      <Skeleton className="max-w-xl" />
      {/* <Flex className="space-x-8">  */}
      <Flex mt="4" my="3" gap="5">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>

      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssuePage;
