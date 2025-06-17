import * as React from 'react';

import { IBasicComponentProps } from '@app/components/Types';

import { concatClasses } from '@app/utils';

interface ITooltipProps extends IBasicComponentProps {
  position?: string;
}

const getClassNames = (props) => {
  return concatClasses(
    'tooltip',
    `bs-tooltip-${props.position}`,
    props.className,
  );
};

const Tooltip: React.SFC<ITooltipProps> =
  (props: ITooltipProps) =>
  <div className={getClassNames(props)} role="tooltip">
    <style jsx>{`
      .tooltip {
        transition: all .15s linear;
      }
    `}</style>
    <div className="arrow"></div>
    <div className="tooltip-inner">
      {props.children}
    </div>
  </div>;

Tooltip.defaultProps = {
  position: 'top',
  children: 'This is a tooltip',
};

export { Tooltip };
