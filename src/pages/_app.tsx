import {
  type DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import React, { useState } from "react";
import { Toaster } from "~/components/ui/toaster";
import "~/styles/globals.css";

const MyApp: AppType<{ dehydratedState: DehydratedState }> = ({
  Component,
  pageProps,
}) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
