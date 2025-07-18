import { type RouteParams, type RouteQuery, createHistoryRouter, createRoute } from 'atomic-router';
import { createEffect, sample } from 'effector';
import { createBrowserHistory } from 'history';

import { Path } from 'shared/lib/consts/path';

import { appStarted } from './init';

export const routes = {
  public: {
    auth: createRoute(),
    passwordRecovery: createRoute(),
  },
  private: {
    main: createRoute(),
  },
};

export const unmappedRoutes = [
  {
    route: routes.public.auth,
    path: `/${Path.LOGIN}`,
  },
  {
    route: routes.private.main,
    path: Path.MAIN,
  },
  {
    route: routes.public.passwordRecovery,
    path: `/${Path['PASSWORD-RECOVERY']}`,
  },
];

export const router = createHistoryRouter({
  routes: unmappedRoutes,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});

export const goToFx = createEffect(
  ({ path, query, params }: { path: string; query?: RouteQuery; params?: RouteParams }) =>
    router.push({
      path,
      params: { ...params },
      query: { ...query },
      method: 'push',
    }),
);
