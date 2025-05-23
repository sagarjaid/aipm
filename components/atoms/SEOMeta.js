/** @format */

import Head from 'next/head';

const SEOMeta = (props) => {
  const { title, description, slug, imgUrl } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta
        name='title'
        content={title}
      />
      <meta
        name='description'
        content={description}
      />
      <link
        rel='canonical'
        href={slug ? `https://aipm.so/${slug}` : 'https://aipm.so/'}
      />

      <meta
        name='google-site-verification'
        content='yqkTsEPyBxAxUcimbxVUySPMRT57sOEfOyQgFQRRcQ0'
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content={slug ? `https://aipm.so/${slug}` : 'https://aipm.so/'}
      />
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:image'
        content={imgUrl || 'https://aipm.so/cover.png'}
      />

      <meta
        property='twitter:card'
        content='summary_large_image'
      />
      <meta
        property='twitter:url'
        content={slug ? `https://aipm.so/${slug}` : 'https://aipm.so/'}
      />
      <meta
        property='twitter:title'
        content={title}
      />
      <meta
        property='twitter:description'
        content={description}
      />
      <meta
        property='twitter:image'
        content={imgUrl || 'https://aipm.so/cover.png'}
      />
      <link
        rel='icon'
        href='https://aipm.so/favicon.svg'
      />
    </Head>
  );
};

export default SEOMeta;
