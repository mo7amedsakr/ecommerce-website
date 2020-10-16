import React, { FC } from 'react';
import { UL, Socials } from './SideNavigationStyles';
import { SideNavItem } from './SideNavItem';
import { FaGithub, FaTwitter, FaFacebookF } from 'react-icons/fa';

export interface SideNavItemsProps {}

export const SideNavItems: FC<SideNavItemsProps> = (props) => {
  const items = [
    { to: '/accessories', label: 'Accessories' },
    { to: '/footwear', label: 'Footwear' },
    { to: '/pants', label: 'Pants' },
    { to: '/tshirts', label: 'T-Shirts' },
  ];

  const social = [
    { url: 'https://github.com/mo7amedsakr', icon: FaGithub },
    { url: 'https://twitter.com/m07amedsakr', icon: FaTwitter },
    { url: 'https://www.facebook.com/mo7amedsakr', icon: FaFacebookF },
  ];

  return (
    <>
      <UL>
        <SideNavItem to="/" label="home" />
        {items.map((item, i) => (
          <SideNavItem key={i} to={item.to} label={item.label} />
        ))}
      </UL>
      <Socials>
        {social.map((el, i) => (
          <a key={i} href={el.url} target="_blank" rel="noopener noreferrer">
            <el.icon />
          </a>
        ))}
      </Socials>
    </>
  );
};
