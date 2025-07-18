import { RouteInstance, RouteParams, RouteParamsAndQuery, chainRoute, redirect } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { $authorized } from 'entities/current-user';

import { routes } from '../router';

export function chainPrivateAccess<Params extends RouteParams>(route: RouteInstance<Params>) {
  const checkAccess = createEvent<RouteParamsAndQuery<Params>>();

  const redirectToAuth = sample({
    clock: checkAccess,
    source: $authorized,
    filter: authorized => !authorized,
  });

  const allow = sample({
    clock: checkAccess,
    source: $authorized,
    filter: authorized => !!authorized,
  });

  redirect({
    clock: redirectToAuth,
    route: routes.public.auth,
  });

  return chainRoute({
    route,
    beforeOpen: checkAccess,
    openOn: allow,
  });
}
