import { ProviderProps, ReactNode } from 'react';

import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { Scope } from 'effector';
import { Provider as EffectorProvider } from 'effector-react';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from 'pay-people-ui-kit';

import { unmappedRoutes } from 'shared/config/router';

export const TestWrapper = ({ children, scope }: { children: ReactNode; scope: ProviderProps<Scope>['value'] }) => {
  const router = createHistoryRouter({ routes: unmappedRoutes });
  router.setHistory(createMemoryHistory());

  return (
    <ThemeProvider>
      <EffectorProvider value={scope}>
        <RouterProvider router={router}>{children}</RouterProvider>
      </EffectorProvider>
    </ThemeProvider>
  );
};
