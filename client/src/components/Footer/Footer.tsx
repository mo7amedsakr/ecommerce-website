import React, { FC } from 'react';
import { Container, Top, Left, Link, Right, Bottom } from './FooterStyle';
import { InputForm } from '../Input/Input';

export interface FooterProps {}

export const Footer: FC<FooterProps> = (props) => {
  const links = [
    { label: 'Lorem', url: '/' },
    { label: 'Lorem', url: '/' },
    { label: 'Lorem', url: '/' },
    { label: 'Lorem', url: '/' },
  ];

  return (
    <Container>
      <Top>
        <Left>
          <h4>Links</h4>
          {links.map((link, i) => (
            <Link key={i} to={link.url}>
              {link.label}
            </Link>
          ))}
        </Left>
        <Right>
          <h4>Lorem, ipsum dolor.</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
            error.
          </p>
          <InputForm type="email" placeholder="your email" label="subscribe" />
        </Right>
      </Top>
      <Bottom>
        <p>
          Copyright &copy; {new Date().getFullYear()}, Simple. Powered by
          Shopify
        </p>
      </Bottom>
    </Container>
  );
};
