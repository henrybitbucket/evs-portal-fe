import * as React from 'react';

import { IBasicComponentProps } from '@app/components/Types';
import I18nLink from '@app/components/I18nLink';

interface IBreadcrumProps extends IBasicComponentProps {
  items: any;
}

interface IBreadcrumItemProps {
  children: any;
  active?: boolean;
}

const breadcrumbs = { name: 'Home', href: '/' };

const BreadcrumbItem: React.SFC<IBreadcrumItemProps> = ({ children, active, ...rest }: IBreadcrumItemProps) =>
  <li {...rest} className={`breadcrumb-item ${active ? 'active' : ''}`}>{children}</li>;

const Breadcrumb: React.SFC<IBreadcrumProps> = ({ items }) =>
  <ol className="breadcrumb">
    <style jsx>{`
      .text-decoration-none {
        text-decoration: none;
      }
    `}</style>
      { [breadcrumbs, ...items].map((item, idx) =>
          idx === ([breadcrumbs, ...items].length - 1) ?
            <BreadcrumbItem key={idx} active>{item.name}</BreadcrumbItem>
            :
            <BreadcrumbItem key={idx}>
              <I18nLink href={item.href} as={item.as || item.href}>
                <a className="text-decoration-none">{item.name}</a>
              </I18nLink>
            </BreadcrumbItem>,
        )
      }
  </ol>;

export { Breadcrumb };
