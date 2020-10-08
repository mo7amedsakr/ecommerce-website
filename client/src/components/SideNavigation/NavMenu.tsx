import React, { FC, useState } from 'react';
import { Menu, MenuIcon } from './SideNavigationStyles';
import { SideNavItems } from './SideNavItems';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { theme } from '../../theme';

export interface NavMenuProps {}

export const NavMenu: FC<NavMenuProps> = (props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const isMobile = useMediaQuery(theme.mediaQueries.mobile);

  if (!isMobile) return null;

  return (
    <Menu>
      <MenuIcon
        onClick={toggleOpen}
        style={{ marginBottom: open ? '1rem' : 0 }}
      >
        <div></div>
        <div></div>
        <div></div>
      </MenuIcon>
      {open ? <SideNavItems /> : null}
    </Menu>
  );
};
