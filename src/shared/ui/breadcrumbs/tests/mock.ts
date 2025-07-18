import { MenuOption } from 'shared/layout/main/interface';
import { Path } from 'shared/lib/consts';

export const mockMenuItems: MenuOption[] = [
  {
    label: 'Главная',
    // route: routes.private.main,
    type: 'link',
    key: Path.MAIN,
  },
];
