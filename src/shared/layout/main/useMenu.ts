import { useEffect, useState } from 'react';

import { useUnit } from 'effector-react';
import { MenuProps } from 'pay-people-ui-kit';

import { router } from 'shared/config/router';
import { Path } from 'shared/lib/consts';

export const useMenu = () => {
  const path = useUnit(router.$path);

  const splittedPath = path.split('/').filter(it => !!it);
  const keyEndIndex = splittedPath.findIndex(
    unit =>
      !Object.values(Path)
        .map(value => value.toString())
        .includes(unit),
  );

  const defaultOpenKeys = keyEndIndex > 0 ? splittedPath.slice(0, keyEndIndex) : splittedPath;
  const defaultValue = defaultOpenKeys[defaultOpenKeys.length - 1] ?? '/';
  const defaultSelectedKeys = [defaultValue];

  const [activeKey, setActiveKey] = useState<string>();
  const [selectedKeys, setSelectedKeys] = useState<string[]>();
  const [openKeys, setOpenKeys] = useState<string[]>();

  const select: MenuProps['onSelect'] = info => {
    setSelectedKeys(info.selectedKeys);
    setActiveKey(info.key);
  };

  const changeOpen: MenuProps['onOpenChange'] = keys => setOpenKeys(keys);

  useEffect(() => {
    if (!!activeKey && activeKey !== defaultValue) {
      setSelectedKeys(defaultSelectedKeys);
      setOpenKeys(defaultOpenKeys);
      setActiveKey(defaultValue);
    }
  }, [defaultValue]);

  return {
    activeKey,
    defaultValue,
    openKeys,
    selectedKeys,
    defaultOpenKeys,
    defaultSelectedKeys,
    onSelect: select,
    onOpenChange: changeOpen,
  };
};
