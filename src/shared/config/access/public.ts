import { RouteInstance, RouteParams, RouteParamsAndQuery, chainRoute, redirect } from 'atomic-router';
import { createEvent, sample } from 'effector';

import { $authorized } from 'entities/current-user';

import { routes } from '../router';

export function chainPublicAccess<Params extends RouteParams>(route: RouteInstance<Params>) {
  const checkAccess = createEvent<RouteParamsAndQuery<Params>>();

  const redirectToMain = sample({
    clock: checkAccess,
    source: $authorized,
    filter: authorized => authorized,
  });

  const allow = sample({
    clock: checkAccess,
    source: $authorized,
    filter: authorized => !authorized,
  });

  redirect({
    clock: redirectToMain,
    route: routes.private.main,
  });

  return chainRoute({
    route,
    beforeOpen: checkAccess,
    openOn: allow,
  });
}
