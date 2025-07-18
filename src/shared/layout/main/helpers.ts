import { createMenuLink } from 'shared/lib/ui';

import { MenuOption, MenuOptionWithNode } from './interface';

export const filterMenuOptions = (options: MenuOption[]): MenuOption[] =>
  options.reduce((acc: MenuOption[], it) => {
    if (!it.hidden) {
      acc.push(it.children?.length ? { ...it, children: filterMenuOptions(it.children) } : it);
    }
    return acc;
  }, []);

export const addLinksNode = (options: MenuOption[]): MenuOptionWithNode[] => {
  return options.map((item): MenuOptionWithNode => {
    return {
      label:
        item.type === 'link' && item.route
          ? createMenuLink({ label: item.label, route: item.route, params: item.params })
          : item.label,
      key: item.key,
      hidden: item.hidden,
      icon: item.icon,
      onClick: item.onClick,
      children: item.children ? addLinksNode(item.children) : undefined,
    };
  });
};
