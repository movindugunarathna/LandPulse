import Link from 'next/link';
import React from 'react';

const Links = () => {
  const links = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Advertisements',
      path: '/advertisements',
    },
    {
      title: 'Price Predictor',
      path: '/predictor',
    },
    {
      title: 'Contact Us',
      path: '/contact',
    },
  ];

  return (
    <>
      {links.map((link) => (
        <Link key={link.title} href={link.path}>
          {link.title}
        </Link>
      ))}
    </>
  );
};

export default Links;
