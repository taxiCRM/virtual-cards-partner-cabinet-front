import { MainLayout as MainLayoutPP, MainLayoutProps as MainLayoutPropsPP } from 'pay-people-ui-kit';

import { HeaderDesktop, HeaderMobile } from './Header';
import { addLinksNode } from './helpers';
import { MenuOptionWithNode } from './interface';
import { useMenu } from './useMenu';
import { useMenuItems } from './useMenuItems';

export type MainLayoutProps = Pick<MainLayoutPropsPP, 'children'>;

export function MainLayout({ children }: MainLayoutProps) {
  const memoLinks = useMenuItems();

  const menuProps = useMenu();

  const nodeLinkChapters: MenuOptionWithNode[] = addLinksNode(memoLinks);

  return (
    <MainLayoutPP
      chapters={nodeLinkChapters}
      header={{
        children: <HeaderMobile />,
      }}
      {...menuProps}
    >
      <HeaderDesktop />

      {children}
    </MainLayoutPP>
  );
}
