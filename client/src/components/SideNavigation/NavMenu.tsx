import React, { FC, useState } from 'react';
import { Menu, MenuIcon } from './SideNavigationStyles';
import { SideNavItems } from './SideNavItems';

export interface NavMenuProps {}

export const NavMenu: FC<NavMenuProps> = (props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

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
