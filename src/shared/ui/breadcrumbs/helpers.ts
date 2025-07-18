import { MenuOption } from 'shared/layout/main/interface';
import { isUuid } from 'shared/lib/validators';

import { IBreadcrumb } from './interface';
import { initMenuItem } from './model';

export const findMenuItem = (routeName: string, menuList: MenuOption[]): MenuOption | undefined => {
  for (const item of menuList) {
    if (item.key === routeName) {
      return item;
    }

    if (item.children) {
      const foundInChildren = findMenuItem(routeName, item.children);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }

  return undefined;
};

export const createBreadcrumbs = (routePath: string, menuList: MenuOption[]): IBreadcrumb[] => {
  const arrPath = routePath.slice(1).split('/');
  const stack: MenuOption[] = [];

  arrPath.forEach((path, index, arr) => {
    if (!isUuid(path)) {
      const menuItem = findMenuItem(path, menuList);
      if (`/${menuItem?.key}` === routePath) {
        return;
      }
      const fullPath = arr.slice(0, index + 1).join('/');

      if (menuItem && !menuItem.children) {
        stack.push({ ...menuItem, key: fullPath });
      }
    }
  });

  const breadcrumbs = stack.map((item: MenuOption): IBreadcrumb => {
    return {
      label: item.label,
      route: '/' + item.key,
    };
  });

  if (breadcrumbs[breadcrumbs.length - 1]?.route.includes(arrPath[arrPath.length - 1])) {
    breadcrumbs.pop();
  }

  return [initMenuItem, ...breadcrumbs];
};
