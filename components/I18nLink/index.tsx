import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import React, { Children } from 'react';

const TIME_TO_PREFECT = 1000;

export const prefectByHref = (href: string) =>
  href && setTimeout(() => Router.prefetch(href), TIME_TO_PREFECT);

const I18nLink: React.SFC<any> = ({ router, children, ...props }) => {
  const child = Children.only(children);

  let className = child.props.className || null;
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} ${
      props.activeClassName
      }`.trim();
  }
  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(I18nLink);
