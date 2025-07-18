import { describe } from 'vitest';

import { createBreadcrumbs } from '../helpers';
import { initMenuItem } from '../model';
import { mockMenuItems } from './mock';

describe('Breadcrumbs', () => {
  // it('/employees', () => {
  //   const breadcrumbs = createBreadcrumbs('/employees', mockMenuItems);
  //   expect(breadcrumbs).toStrictEqual([initMenuItem]);
  // });

  it('/', () => {
    const breadcrumbs = createBreadcrumbs('/', mockMenuItems);
    expect(breadcrumbs).toStrictEqual([initMenuItem]);
  });

  // it('/organization/filials', () => {
  //   const breadcrumbs = createBreadcrumbs('/organization/filials', mockMenuItems);
  //   expect(breadcrumbs).toStrictEqual([initMenuItem]);
  // });

  // it('/organization/filials/ffffffff-0000-0000-0000-000000000023', () => {
  //   const breadcrumbs = createBreadcrumbs('/organization/filials/ffffffff-0000-0000-0000-000000000023', mockMenuItems);
  //   expect(breadcrumbs).toStrictEqual([initMenuItem, { label: 'Подразделения', route: '/organization/filials' }]);
  // });
});
