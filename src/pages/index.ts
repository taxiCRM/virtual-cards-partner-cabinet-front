import { createRoutesView } from 'atomic-router-react';

import { AuthRoute } from './auth/sign-in';
import { MainRoute } from './main';
import { NotFoundPage } from './not-found';

export const Pages = createRoutesView({
  routes: [AuthRoute, MainRoute],
  otherwise: NotFoundPage,
});
