import * as React from 'react';

import { IBasicComponentProps } from '@app/components/Types';

import { concatClasses } from '@app/utils';

interface IAvatarProps extends IBasicComponentProps {
  isOnline?: boolean;
  src?: string;
  alt?: string;
  gender?: string;
}

const getClassNames = (props: IAvatarProps) => {
  return concatClasses(
    'avatar',
    `avatar-${props.isOnline ? 'online' : 'off'}`,
    props.className,
  );
};

const Avatar: React.SFC<IAvatarProps> =
  (props: IAvatarProps) =>
  <div className={getClassNames(props)}>
      <img
        className="img-fluid"
        src={props.src || `static/images/${props.gender === 'Male' ? 'male' : 'female'}.png`}
        alt={props.alt}
      />
      <i></i>
  </div>;

Avatar.defaultProps = {
  isOnline: false,
  gender: 'Male',
  alt: 'avatar',
};

export { Avatar };
