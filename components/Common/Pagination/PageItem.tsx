import * as React from 'react';
import css from 'styled-jsx/css';

import { IBasicComponentProps } from '@app/components/Types';
import { concatClasses } from '@app/utils';

interface IPageItemProps extends IBasicComponentProps {
  active?: boolean;
  disabled?: boolean;
  children: any;
  onClick?: any;
  href?: string;
  title?: string;
}

const getClassNames = (props: IPageItemProps) => concatClasses(
  'paginate_button page-item',
  props.active && 'active',
  props.disabled && 'disabled',
);

const PageItemStyle = css`
  li {
    cursor: pointer;
  }
`;

const PageItem: React.SFC<IPageItemProps> = (props: IPageItemProps) => {
  const { active, disabled } = props;
  const Component = active || disabled ? 'span' : 'a';

  return (
    <li className={getClassNames(props)}>
      <style jsx>{PageItemStyle}</style>
      <Component className="page-link" onClick={props.onClick}>
        {props.children}
      </Component>
    </li>
  );
};

export default PageItem;
