import React, {useState}  from 'react';

import { FieldProps } from 'formik';

import { Label, ILabelProps } from '@app/components/Common/Label';

import { concatClasses } from '@app/utils';

interface IInputProps extends FieldProps {
  label: ILabelProps;
  help?: string;
  maxLength?: number;
  minLength?: number;

}

const getClassNames = props => concatClasses(
  'form-control',
  props.hasErrors && 'is-invalid',
);

const Input: React.SFC<IInputProps> = ({
  field, // { name, value, onChange, onBlur },
  label,
  help,
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { touched = {}, errors = {} } = form || {};

  const formatdisplay = (text) => {

    try {
        if (props.formatdisplay)
        	text = props.formatdisplay(text);
        return text || '';
    } catch (error) {
        return text || '';
    }
  }

  const formatoutput = (text) => {

    try {
        if (props.formatoutput)
        	text = props.formatoutput(text);
        return text || '';
    } catch (error) {
        return text || '';
    }
  }

  const toString = (arg) => {
    if (typeof arg === 'number') return (arg + '');
    return arg;
  }
  const [_value, _setValue] = useState(toString(props.value || field.value || ''));

  const _onChange = (e) => {
  	try {
		_setValue(formatdisplay(e && e.target ? e.target.value : ''));
		props.onChange && props.onChange(formatoutput(e && e.target ? e.target.value : ''));
    } catch(err) {console.info(err)}
  }

  let extendValue = !props.onChange ? {} : {value: formatdisplay(_value)};

  return(

    <div className="form-group" style={{...props.groupstyle}}>

      {label &&
        <Label
          htmlFor={field.name}
          {...label}
        />
      }

      {
      !!props.textarea ?
      <textarea
        className={getClassNames({
          hasErrors: errors[field.name] && touched[field.name],
        })}
        {...field} {...props} {...extendValue}
        id={field.name}
        onChange={!props.onChange ? field.onChange : _onChange}
        readOnly={!!props.readonly || !!props.readOnly}
      />
      :
      <input
        className={getClassNames({
          hasErrors: errors[field.name] && touched[field.name],
        })}
        {...field} {...props} {...extendValue}
        id={field.name}
        onChange={!props.onChange ? field.onChange : _onChange}
        onClick={(event) => {
            props.onClick && props.onClick(event)
        }}
        readOnly={!!props.readonly || !!props.readOnly}
      />
      }
      {help && <small className="form-text text-muted">{help}</small>}

      {touched[field.name] &&
        errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}

    </div>

  );
};

export { Input };
