/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { ReactNode, startTransition, StrictMode, useMemo, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "~/mui/createEmotionCache";
import ClientStyleContext from "~/mui/ClientStyleContext";
import theme from "~/mui/theme";

interface ClientCacheProviderProp {
  children: ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProp) {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientCacheProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <RemixBrowser />
        </ThemeProvider>
      </ClientCacheProvider>
    </StrictMode>
  );
});
