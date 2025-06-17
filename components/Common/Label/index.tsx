import React from 'react';

import { concatClasses } from '@app/utils';

export interface ILabelProps {
  htmlFor: string;
  srOnly?: boolean;
  content?: React.ReactNode | React.ReactNode[];
  prefix?: React.ReactNode | React.ReactNode[];
  suffix?: React.ReactNode | React.ReactNode[];
}

const getLabelClassnames = (props: ILabelProps) => concatClasses(
  'form-control-label',
  props.srOnly && 'sr-only',
  props.suffix && 'with-suffx',
  props.prefix && 'with-prefix',
);

const Label: React.SFC<ILabelProps> = (props) => {
  return (
    <label className={getLabelClassnames(props)} htmlFor={props.htmlFor}>
      {props.prefix && <span className="prefix">{props.prefix}</span>}
      {props.content
        ? <span>{props.content}</span>
        : <span>{props.children}</span>
      }
      {props.suffix && <span className="suffix">{props.suffix}</span>}
    </label>
  );
};

export { Label };
