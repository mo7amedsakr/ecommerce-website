import React, { FC } from 'react';
import { theme } from './theme';
import { useMediaQuery } from './hooks/useMediaQuery';
import { Container, Main, Grid } from './LayoutStyles';
import { Tobbar } from './components/Topbar/Tobbar';
import { SideNavigation } from './components/SideNavigation/SideNavigation';
import { NavMenu } from './components/SideNavigation/NavMenu';

import { Footer } from './components/Footer/Footer';

export interface LayoutProps {}

export const Layout: FC<LayoutProps> = (props) => {
  const isMobile = useMediaQuery(theme.mediaQueries.mobile);

  return (
    <Container>
      <Tobbar />
      {isMobile ? <NavMenu /> : null}
      <Grid>
        {isMobile ? null : <SideNavigation />}
        <Main>{props.children}</Main>
      </Grid>
      <Footer />
    </Container>
  );
};
