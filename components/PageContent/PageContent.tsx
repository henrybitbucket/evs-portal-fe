import * as React from 'react';
import { concatClasses } from '@app/utils';
import { IBasicComponentProps } from '@app/components/Types';

const getClassNames = (props) => {
  return concatClasses(
    'page-content',
    props.fluid && 'container-fluid',
    props.className,
  );
};

interface IPageContentProps extends IBasicComponentProps {
  children: React.ReactNode;
  fluid?: boolean;
}

const PageContent: React.SFC<IPageContentProps> = (props: IPageContentProps) => (
  <div className={getClassNames(props)}>
    {props.children}
  </div>
);

export { PageContent };
