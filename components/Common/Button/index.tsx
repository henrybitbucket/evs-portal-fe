import * as React from 'react';

import { IBasicComponentProps } from '@app/components/Types';

import { concatClasses } from '@app/utils';

export interface IButtonProps extends IBasicComponentProps {
  isSubmitting?: boolean;
  isValid?: boolean;
  icon?: React.ReactNode;
  color?: string;
  rounded?: boolean;
  size?: string;
  onClick?: (ev: any) => any;
  renderLoading?: (component: React.ReactNode) => React.ReactNode;
  type?: string;
}

const getClassNames = ({ className, color, size }) => {
  return concatClasses(
    'btn',
    `btn-${color}`,
    className,
    size && `btn-${size}`,
  );
};

const Button: React.SFC<IButtonProps> =
  ({ children, className, icon, color, isSubmitting, rounded, size, renderLoading, isValid, ...rest }) =>
  <button
    className={getClassNames({ className, color, size })}
    {...rest}
    disabled={isSubmitting || !isValid}>

    {isSubmitting ?
        <><span>Loading ...</span></>
    :
      <>
          {icon && <i className={`icon ${icon}`} aria-hidden="true"></i>}
          {children}
      </>
    }

  </button>;

Button.defaultProps = {
  color: 'primary',
  isValid: true,
};

export { Button };
