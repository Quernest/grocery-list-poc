import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { PropsWithChildren } from "react"

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
