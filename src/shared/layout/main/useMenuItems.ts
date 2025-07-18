import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from 'shared/config/router';
import { Path } from 'shared/lib/consts';

import { filterMenuOptions } from './helpers';

export const useMenuItems = () => {
  const { t } = useTranslation(['common', 'auth']);

  const memoLinks = useMemo(
    () =>
      filterMenuOptions([
        {
          label: t('common:main'),
          route: routes.private.main,
          type: 'link',
          key: Path.MAIN,
        },
      ]),
    [],
  );

  return memoLinks;
};
