import * as React from 'react';
import { concatClasses } from '@app/utils';

const getClassNames = (props) => {
  return concatClasses(
    'page-header',
  );
};

interface IPageHeaderProps {
  children: React.ReactNode;
}

const PageHeader: React.SFC<IPageHeaderProps> = (props: IPageHeaderProps) => (
  <div className={getClassNames(props)}>
    {props.children}
  </div>
);

export { PageHeader };
