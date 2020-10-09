import React, { FC, useContext } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import { Container, Top, Link, Logo } from './TobbarStyles';
import { Search } from '../Searchbar/Search';
import { AuthContext } from '../../context/Auth';

export interface TobbarProps {}

export const Tobbar: FC<TobbarProps> = (props) => {
  const { toggleAuthModal, user, authLodaing } = useContext(AuthContext);

  const auth = user ? (
    <h3>{user.name}</h3>
  ) : authLodaing ? (
    <h3>Loading...</h3>
  ) : (
    <button onClick={toggleAuthModal}>
      <i style={{ marginRight: '0.5rem' }}>
        <FiLogIn />
      </i>
      Login
    </button>
  );

  const items = 0;
  return (
    <Container>
      <Top>
        <Search />
        <Link to="/cart">
          <i>
            <RiShoppingCartLine />
          </i>
          <span>Cart ({items})</span>
        </Link>
        {auth}
      </Top>
      <Logo to="/">e-commerce.</Logo>
    </Container>
  );
};
