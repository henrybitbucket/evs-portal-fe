import Document, { Head, Main, NextScript, DocumentProps } from 'next/document';

import { ILocationProps } from '@app/utils';

interface IMyDocumentProps extends DocumentProps {
  location: ILocationProps;
}

class MyDocument extends Document<IMyDocumentProps> {
  static getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
    };
  }

  render() {
    const { __NEXT_DATA__: { props } } = this.props;
    return (
      <html lang={props && props.initialLanguage}>
        <Head>
          <base href="/" />
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <link rel="shortcut icon" type="image/png" href={'static/images/favicon.ico'} />
          <link rel="preload" as="style" href="/_next/static/styles/global.css" />

          <link rel="stylesheet" href="/_next/static/styles/global.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
            <script async defer
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyArffVuFcSQIHHky55kdV-gVyoPoKi5Xtw&callback=initMapPhysical&libraries=places"
            ></script>
            <script async defer
              src="https://apis.google.com/js/api.js"
            ></script>
        </body>
      </html>
    );
  }
}

export default MyDocument;
