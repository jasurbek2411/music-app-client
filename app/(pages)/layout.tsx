'use client'
import Header from "@/components/shared/header";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="bg-black/80 min-h-[90vh]">{children}</div>
    </QueryClientProvider>
  );
};

export default Layout;
