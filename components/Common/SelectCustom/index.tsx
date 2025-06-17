import React, {useState} from 'react';
import { FieldProps } from 'formik';
import Select from 'react-select';

import { Label, ILabelProps } from '@app/components/Common/Label';

import { concatClasses } from '@app/utils';

import styles from './styles';

interface ISelectCustomProps extends FieldProps {
  label: ILabelProps;
  options: ISelectOptionProps[];
  onChange: (name, value) => void;
  onBlur: (name, value) => void;
}

interface ISelectOptionProps {
  label: string;
  value: string;
}

const getClassNames = props => concatClasses(
  'select-custom',
  props.hasErrors && 'is-invalid',
);

const SelectCustom: React.SFC<ISelectCustomProps> = ({
  field, // { name, value, onChange, onBlur },
  label,
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const { touched = {}, errors = {} } = form || {};

  let options = [];
  (props.options || [])
  .map(o => {
    if (o.options) {
        options = options.concat(o.options);
    } else {
        options.push(o);
    }
  })


  const opt = (options ? (options.find(option => {
  	if (props.value !== null && props.value !== undefined) {
  		return option.value === props.value;
  	}
    return option.value !== undefined && (option.value === field.value || option.value === props.value);
  })) : {}) || {};
  const [option, setValue] = useState({
    label: opt.label,
    value: opt.value,
  });

  const handleChange = (value: any) => {
    props && props.onChange && props.onChange(field.name, value);
    if (props && props.onInputChange) {
        props.onInputChange(value.value, {action: 'input-change'});
    }
    setValue(value);
  };

  const handleBlur = () => {
    props && props.onBlur && props.onBlur(field.name, true);
  };
  console.info(options, opt);
  return (

    <div className="form-group" style={{...props.groupstyle, ...props.groupStyle}}>
      {label &&
        <Label
          htmlFor={field.name}
          {...label}
        />
      }
      <style jsx>{styles}</style>
      <Select
        {...props}
        isSearchable={!props.readOnly}
        className={getClassNames({
          hasErrors: errors[field.name] && touched[field.name],
        })}
        onChange={handleChange}
        onBlur={handleBlur}
        value={options ? options.find(_option => {
            return (option.value !== undefined || props.value !== undefined) && (_option.value == option.value || _option.value == props.value);
        }) : ''}
      />
      {touched[field.name] && errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}

    </div>

  );
};

export { SelectCustom };
