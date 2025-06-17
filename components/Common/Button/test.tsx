import React from 'react';
import { shallow } from 'enzyme';

import { Button } from './index';

describe('Button', () => {
  it('renders the checkbox without props', () => {
    const wrapper = shallow(
      <Button>Click me</Button>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
