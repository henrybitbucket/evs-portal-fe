import { IBasicComponentProps } from '@app/components/Types';

interface IPasswordFormProps extends IBasicComponentProps {
  changePassword?: (password: IChangePasswordProps, cb) => Promise<{}>;
  initialValues?: IChangePasswordProps;
}

interface IChangePasswordProps {
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
}

interface IPasswordFormState {
  loading?: boolean;
  formError?: { message: string };
}

export {
  IPasswordFormProps,
  IPasswordFormState,
};
