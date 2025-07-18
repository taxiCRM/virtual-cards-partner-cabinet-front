import type { PropsWithChildren } from 'react';

import { RouterProvider } from 'atomic-router-react';
import { ThemeProvider } from 'pay-people-ui-kit';

import { router } from 'shared/config/router';

export function Provider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <RouterProvider router={router}>{children}</RouterProvider>
    </ThemeProvider>
  );
}
