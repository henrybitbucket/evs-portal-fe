import React from 'react';
import DatePicker from 'react-datepicker';
import css from 'styled-jsx/css';

import { Label } from '@app/components/Common';
import { isServer } from '@app/utils';

const styles = css.global`
  @import "static/styles/scss-in-lib/react-datepicker";

  .date-picker {
    .react-datepicker-wrapper,
    .react-datepicker__input-container,
    .form-control {
      width: 100%
    }
    .react-datepicker__input-container input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    :global(.react-datepicker-popper) {
      z-index: 10 !important;
    }
    :global(.input-group .form-control) {
      z-index: 0 !important;
    }
  }
`;

const DatePickerItem: React.SFC<any> =
({ field, label, form, value, onChange, onBlur, ...props }) => {

  const handleChange = (va: any) => {
    onChange && onChange(field.name, va);
  };

  const handleBlur = () => {
    onBlur && onBlur(field.name);
  };

  const getValue = (value) => {

  	if (!value) {
  		return null;
  	}

  	let date = new Date(value);
  	if (date.getFullYear()) {
  		return date;
  	}
  	return null;
  }

  value = getValue(value);

  return(
    <div className="form-group date-picker" style={{...props.groupstyle}}>
      <style jsx>{styles}</style>
      {label &&
        <Label
          htmlFor={field.name}
          {...label}
        />
      }
      <div className="input-group">
        <span className="input-group-addon">
          <i className="icon wb-calendar" aria-hidden="true"></i>
        </span>
        { !isServer() &&
          <DatePicker
            {...props}
            value={value}
            id={field.name}
            name={field.name}
            className="form-control"
            onChange={handleChange}
            onBlur={handleBlur}
            selected={
              typeof value === 'string'
                ? new Date(value)
                : value
            }
          />
        }
      </div>
    </div>
  );
};

DatePickerItem.defaultProps = {
  field: {
    name: 'datepicker',
  },
  peekNextMonth: true,
  showMonthDropdown: true,
  showYearDropdown: true,
  dropdownMode: 'select',
  dateFormat: 'dd/MM/yyyy',
};

export { DatePickerItem };
