import * as React from 'react';

import { useState } from 'react';

import { FieldProps } from 'formik';

import { Label, ILabelProps } from '@app/components/Common/Label';

import { concatClasses } from '@app/utils';
import { IBasicComponentProps } from '@app/components/Types';

interface IRadioProps extends FieldProps, IBasicComponentProps {
  label: ILabelProps;
  options: IRadioOptionProps[];
}

interface IRadioOptionProps {
  id: string;
  label: string;
  value: string;
}

const getClassNames = props => concatClasses(
  'radio-custom radio-primary',
  props.className,
  props.hasErrors && 'is-invalid',
);

const Radio: React.SFC<IRadioProps> = ({
  field, // { name, value, onChange, onBlur },
  label,
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { touched = {}, errors = {} } = form || {};

  const _onClick = (e, option) => {
  	setState({value: option.value,})
    props.onClick && props.onClick(e, option);
  }

  const [state, setState] = useState({
  	value: field.value || props.value,
  })

  return (

    <div className="form-group" style={{...props.groupstyle}}>

      {label &&
        <Label
          htmlFor={field.name}
          {...label}
        />
      }
      <div>
        {props.options.map(option => {

        		let checked = false;
                try {checked = option.value.toString() === (state.value || '').toString();} catch(e) {console.info(e)}
                return (
                  <div
                    className={getClassNames({
                      hasErrors: errors[field.name] && touched[field.name],
                      className: props.className,
                    })}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      checked={!!checked}
                      {...field}
                      { ...option }
                      {...props}
                      onChange={(e) => {
                      	_onClick(e, option);
                      }}

                    />
                    <label style={{...props.textStyle}} htmlFor={option.id}>{option.label}</label>
                  </div>
                )}
        )}
      </div>

      {touched[field.name] &&
        errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}

    </div>

  );
};

export { Radio };
