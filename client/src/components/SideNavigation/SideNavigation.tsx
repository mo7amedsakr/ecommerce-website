import React, { FC } from 'react';
import { Container } from './SideNavigationStyles';
import { SideNavItems } from './SideNavItems';

export interface SideNavigationProps {}

export const SideNavigation: FC<SideNavigationProps> = (props) => {
  return (
    <Container>
      <SideNavItems />
    </Container>
  );
};
