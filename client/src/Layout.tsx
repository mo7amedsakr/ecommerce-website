import React, { FC, useContext } from 'react';
import { Container, Main, Grid } from './LayoutStyles';
import { Tobbar } from './components/Topbar/Tobbar';
import { SideNavigation } from './components/SideNavigation/SideNavigation';
import { NavMenu } from './components/SideNavigation/NavMenu';
import { Footer } from './components/Footer/Footer';
import { AuthContext } from './context/Auth';
import { Auth } from './containers/Auth/Auth';

export interface LayoutProps {}

export const Layout: FC<LayoutProps> = (props) => {
  const { isAuthModalOpen } = useContext(AuthContext);

  return (
    <Container>
      {isAuthModalOpen ? <Auth /> : null}
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
