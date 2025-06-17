import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { IBasicComponentProps } from '@app/components/Types';
import { recapchaSiteKey } from '@app/utils/public-config';

const TEST_SITE_KEY = recapchaSiteKey;
const DELAY = 1500;

interface IRecapchaProps extends IBasicComponentProps {
  theme: string;
  size: string;
  onChange: any;
}

interface IRecapchaState {
  callback: string;
  value: string;
  load: boolean;
  expired: boolean;
}

class Recapcha extends React.Component<IRecapchaProps, IRecapchaState> {

  static defaultProps = {
    theme: 'light',
    size: 'normal',
  };

  recapcheRef = React.createRef();

  state = {
    callback: 'not fired',
    value: null,
    load: false,
    expired: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ load: true });
    }, DELAY);
  }

  handleChange = (value) => {
    this.setState({ value });
    if (value === null) this.setState({ expired: true });
    this.props.onChange(value);
  }

  asyncScriptOnLoad = () => {
    this.setState({ callback: 'called!' });
  }

  render() {
    return(
      <div className="form-group d-flex justify-content-center">
        <ReCAPTCHA
          ref={this.recapcheRef}
          sitekey={TEST_SITE_KEY}
          onChange={this.handleChange}
          asyncScriptOnLoad={this.asyncScriptOnLoad}
          {...this.props}
        />
      </div>
    );
  }
}

export { Recapcha };
