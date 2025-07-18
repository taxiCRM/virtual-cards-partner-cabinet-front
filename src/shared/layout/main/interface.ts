import { ReactNode } from 'react';

import { RouteInstance } from 'atomic-router';

export type MenuType = 'link';

export type MenuOption = {
  label: string;
  key: string;
  hidden?: boolean;
  icon?: ReactNode;
  type?: MenuType;
  route?: RouteInstance<any>;
  onClick?: (e?: any) => void;
  children?: MenuOption[];
  params?: any;
};

export type MenuOptionWithNode = {
  label: ReactNode;
  key: string;
  hidden?: boolean;
  icon?: ReactNode;
  onClick?: (e?: any) => void;
  children?: MenuOptionWithNode[];
};
