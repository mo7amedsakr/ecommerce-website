import React, { FC } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FiLogIn } from 'react-icons/fi';
import { Container, Top, Link, Logo } from './TobbarStyles';
import { Search } from '../Searchbar/Search';

export interface TobbarProps {}

export const Tobbar: FC<TobbarProps> = (props) => {
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
        <Link to="/login">
          <i>
            <FiLogIn />
          </i>
          <span>Login</span>
        </Link>
      </Top>
      <Logo to="/">e-commerce.</Logo>
    </Container>
  );
};
