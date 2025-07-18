import { useMemo } from 'react';

import { Button, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { useUnit } from 'effector-react';
import { ArrowLeft } from 'lucide-react';

import { goToFx } from 'shared/config/router';
import { MenuOption } from 'shared/layout/main/interface';

import { createBreadcrumbs } from './helpers';
import { $backRoute, $routePathName } from './model';

export function Breadcrumbs({ menuList }: { menuList: MenuOption[] }) {
  const [routeName] = useUnit([$routePathName, $backRoute]);

  const breadcrumbs = useMemo(() => createBreadcrumbs(routeName, menuList), [routeName, menuList]);

  if (routeName == '/') return <div></div>;

  return (
    <Button
      onClick={() => {
        goToFx({ path: breadcrumbs[breadcrumbs.length - 1].route });
      }}
      style={{ padding: 0 }}
      type='text'
    >
      <Flex align='center' gap={8}>
        <ArrowLeft color='#ccc' size={24} />
        <Title level={4} style={{ margin: 0, color: '#00000061', fontWeight: 550 }}>
          {breadcrumbs[breadcrumbs.length - 1]?.label}
        </Title>
      </Flex>
    </Button>
  );
}
