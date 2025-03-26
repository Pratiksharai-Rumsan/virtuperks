"use client";

import { RamanClient } from '@rumsan/raman';
import { RumsanProvider } from '@rumsan/react-query';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConnectKitProvider } from "connectkit";
import * as React from "react";

interface QueryProviderProps {
  children: React.ReactNode;
}

export const ramanClient = new RamanClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


export function Providers({ children }: QueryProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
  return (
    <RumsanProvider rumsanClient={ramanClient}>
    <QueryClientProvider client={queryClient}>
      <ConnectKitProvider theme="auto">{children}</ConnectKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </RumsanProvider>
  );
}
