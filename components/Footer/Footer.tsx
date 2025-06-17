import * as React from 'react';
import { devTeam, website } from '@app/utils/public-config';

import css from 'styled-jsx/css';

const styles = css`
  .site-footer {
    bottom: 0;
    position: static;
    left: 0;
    right: 0;
  }
`;

const Footer = () => (
  <footer className="site-footer">
    <style jsx>{styles}</style>
    <div className="site-footer-right">Copyright © 2021 <a target="_blank" href={website}>{devTeam + ' '}</a>All rights reserved.</div>
    {/*<div className="site-footer-right">
      Crafted with <i className="red-600 wb wb-heart"></i> by <a
      target="_blank" href={website}>{devTeam}</a>
    </div>*/}
  </footer>
);

export { Footer };
