import React, { FC } from 'react';
import { Container, Main, Grid } from './LayoutStyles';
import { Tobbar } from './components/Topbar/Tobbar';
import { SideNavigation } from './components/SideNavigation/SideNavigation';
import { NavMenu } from './components/SideNavigation/NavMenu';

import { Footer } from './components/Footer/Footer';

export interface LayoutProps {}

export const Layout: FC<LayoutProps> = (props) => {
  return (
    <Container>
      <Tobbar />
      <NavMenu />
      <Grid>
        <SideNavigation />
        <Main>{props.children}</Main>
      </Grid>
      <Footer />
    </Container>
  );
};
