import * as React from 'react';
import { IBasicComponentProps } from '@app/components/Types';
import Head from 'next/head';

interface ITotProps extends IBasicComponentProps {
  title: string;
}

const getImage = (props) => {
	if (!props.image) {
		return props.image;
	}
	if (!props.url) {
		return props.image;
	}
	if (!props.image.startsWith('http') && props.url.startsWith('http')) {
		return props.url.replace(/^(https{0,1}\:\/\/[^\/]+)(\/.*)/g, '$1') + props.image;
	}

	return props.image;
}

const TotPage: React.SFC<ITotProps> = (props: ITotProps) => (
  <>
      <Head>
        <meta name="viewport"
        key="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        {props.title &&
          <title>{props.title || 'Admin'}</title>
        }
		{props.description ?
		  <meta name="description" content={props.description}/>
		  :
		  <meta name="description" content="Power by ReactJS"/>
		}

		<meta name="keywords" content={props.keywords || ''}/>

		{props.asPath ?
		  <link rel="canonical" href={props.url || props.asPath} />
		  :
		  null
		}
		{!props.inLineCss ?
			<link rel="stylesheet" href={"/_next/static/styles/global.css?v=" + (props.config && props.config.buildId || '')} />
		: null}
      </Head>

    {props.children}
  </>
);

export { TotPage };
