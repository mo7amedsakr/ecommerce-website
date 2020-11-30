import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { LI } from './SideNavigationStyles';
import { theme } from '../../theme';

export interface SideNavItemProps {
  to: string;
  label: string;
}

export const SideNavItem: FC<SideNavItemProps> = (props) => {
  return (
    <LI>
      <NavLink
        to={props.to}
        exact
        activeStyle={{ fontWeight: theme.fontWeight.mid }}
      >
        {props.label}
      </NavLink>
    </LI>
  );
};
