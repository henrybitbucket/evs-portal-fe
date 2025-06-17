import React, { useState } from 'react';
import { Field, Formik, Form } from 'formik';

import { Input, Button } from '@app/components/Common';
import { IPasswordFormProps } from './types';
import { repTextCapitalize } from '@app/utils';

const FIELDS = ['oldPassword', 'newPassword', 'confirmPassword'];

const validatePasswordForm = t => (values) => {

  const errors: any = {};

  FIELDS.map((key) => {
    if (!values[key]) {
      errors[key] = t('REQUIRED_INPUT_CTA', { value: t(repTextCapitalize(key)).toLowerCase() });
    }

    if (values.newPassword && values.newPassword.length < 6) {
      errors.newPassword = t('NEW_PASSWORD_MUST_HAVE_AT_LEAST_6_CHARACTERS');
    }

    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = t('THE_NEW_PASSWORD_AND_CONFIRMATION_PASSWORD_DO_NOT_MATCH');
    }
  });
  return errors;
};

const PasswordForm: React.SFC<IPasswordFormProps> = (props: IPasswordFormProps) => {
  const [formError, setFormError] = useState(null);

  const handleChangePassword = async (values, { setSubmitting }) => {

    await props.changePassword(values, (error) => {
      setSubmitting(false);
      setFormError(props.t(error));
    });
  };

  const renderInnerForm = (args) => {
    const { isSubmitting, isValid } = args;

    return(
      <Form noValidate>
        {formError && <div className="alert alert-danger">{formError}</div> }
        <Field
          name="oldPassword"
          type="password"
          autoFocus
          component={Input}
          placeholder={props.t(repTextCapitalize(FIELDS[0]).toUpperCase())}
        />
        <Field
          name="newPassword"
          type="password"
          component={Input}
          placeholder={props.t(repTextCapitalize(FIELDS[1]).toUpperCase())}
        />
        <Field
          name="confirmPassword"
          type="password"
          component={Input}
          placeholder={props.t(repTextCapitalize(FIELDS[2]).toUpperCase())}
        />
        <Button
          color="primary"
          type="submit"
          className="btn-block"
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {props.t('CHANGE_PASSWORD')}
        </Button>
      </Form>
    );
  };

  return(
    <Formik
      initialValues={props.initialValues}
      validate={validatePasswordForm(props.t)}
      onSubmit={handleChangePassword}
      render={renderInnerForm}
    />
  );
};

PasswordForm.defaultProps = {
  initialValues: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
};

export{ PasswordForm };
