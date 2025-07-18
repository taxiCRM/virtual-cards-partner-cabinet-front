import { Flex, useBreakpoint } from 'pay-people-ui-kit';

import { Breadcrumbs } from 'shared/ui';
import { ProfileMenu } from 'shared/ui';

import { useMenuItems } from './useMenuItems';

export const HeaderMobile = () => {
  const { md } = useBreakpoint();

  const memoLinks = useMenuItems();

  return (
    <Flex justify={md ? 'space-between' : 'flex-end'} align='center' style={{ width: '100%' }}>
      {md && <Breadcrumbs menuList={memoLinks} />}
      <ProfileMenu />
    </Flex>
  );
};

export const HeaderDesktop = () => {
  const { xl } = useBreakpoint();

  const memoLinks = useMenuItems();

  if (xl) {
    return (
      <Flex justify='space-between' align={'flex-end'} style={{ marginBottom: 36 }}>
        <Breadcrumbs menuList={memoLinks} />
        <ProfileMenu />
      </Flex>
    );
  }
};
