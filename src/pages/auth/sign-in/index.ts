import { chainPublicAccess } from 'shared/config/access';
import { AuthLayout } from 'shared/layout';

import { authRoute } from './model';
import { AuthPage } from './ui';

export const AuthRoute = {
  view: AuthPage,
  route: chainPublicAccess(authRoute),
  layout: AuthLayout,
};
