import React, { FC } from 'react';
import { Container } from './SideNavigationStyles';
import { SideNavItems } from './SideNavItems';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { theme } from '../../theme';

export interface SideNavigationProps {}

export const SideNavigation: FC<SideNavigationProps> = (props) => {
  const isMobile = useMediaQuery(theme.mediaQueries.mobile);
  if (isMobile) return null;

  return (
    <Container>
      <SideNavItems />
    </Container>
  );
};
