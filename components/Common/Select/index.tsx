import * as React from 'react';

import { FieldProps } from 'formik';

import { Label, ILabelProps } from '@app/components/Common/Label';

import { concatClasses } from '@app/utils';

interface ISelectProps extends FieldProps {
  label?: ILabelProps;
  options: ISelectOptionProps[];
}

interface ISelectOptionProps {
  label?: string;
  value: any;
}

const getClassNames = props => concatClasses(
  'form-control custom-select',
  props.hasErrors && 'is-invalid',
);

const Select: React.SFC<ISelectProps> = ({
  field, // { name, value, onChange, onBlur },
  label,
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { touched = {}, errors = {} } = form || {};
  return (

    <div className="form-group">

      {label &&
        <Label
          htmlFor={field.name}
          {...label}
        />
      }

      <select
        className={getClassNames({
          hasErrors: errors[field.name] && touched[field.name],
        })}
        {...field} {...props}
        id={field.name}
      >
        {props.options.map(option => (
            <option key={option.value} value={option.value}>{option.label || option.value}</option>
          ))}
      </select>

      {touched[field.name] &&
        errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}

    </div>

  );
};

export { Select };
