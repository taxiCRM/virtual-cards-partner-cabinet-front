import { chainPrivateAccess } from 'shared/config/access';
import { MainLayout } from 'shared/layout';

import { mainRoute } from './model';
import { MainPage } from './ui';

export const MainRoute = {
  view: MainPage,
  route: chainPrivateAccess(mainRoute),
  layout: MainLayout,
};
