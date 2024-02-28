"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

// contains a cache for fetching data
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
