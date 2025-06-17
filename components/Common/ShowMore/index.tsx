import React, { useState } from 'react';

import { concatClasses } from '@app/utils';
import { IBasicComponentProps } from '@app/components/Types';

interface IShowMoreProps extends IBasicComponentProps {
  options?: number[];
  size?: string;
  name: string;
  pageSize: number;
  onShowMore?: (value) => void;
}

const getClassNames = props => concatClasses(
  'form-control custom-select',
  props.className,
  props.size && `form-control-${props.size}`,
);

const ShowMore: React.SFC<IShowMoreProps> = (props: IShowMoreProps) => {

  const handleChange = e => props.onShowMore(e.target.value);

  return (
    <select
      className={getClassNames(props)}
      id={props.name}
      name={props.name}
      onChange={handleChange}
      value={props.pageSize || 10}
    >
      <style jsx>{`
        select {
          width: 65px;
        }
      `}</style>
      {props.options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
  </select>
  );
};

ShowMore.defaultProps = {
  size: 'sm',
  options: [10, 25, 50, 100],
};

export { ShowMore };
