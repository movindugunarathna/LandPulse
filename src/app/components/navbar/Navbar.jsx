import Link from 'next/link';
import React from 'react';
import Links from './links/Links';

const Navbar = () => {
  return (
    <div className="container">
      <div>Logo</div>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
