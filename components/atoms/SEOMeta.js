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
        href={slug ? `https://getaipm.com/${slug}` : 'https://getaipm.com/'}
      />

      <meta
        name='google-site-verification'
        content='LXDeIpvQYde2OCvg11rdWuaV__5vn7LaaX9U91wXC38'
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:url'
        content={slug ? `https://getaipm.com/${slug}` : 'https://getaipm.com/'}
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
        content={imgUrl || 'https://getaipm.com/cover.png'}
      />

      <meta
        property='twitter:card'
        content='summary_large_image'
      />
      <meta
        property='twitter:url'
        content={slug ? `https://getaipm.com/${slug}` : 'https://getaipm.com/'}
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
        content={imgUrl || 'https://getaipm.com/cover.png'}
      />
      <link
        rel='icon'
        href='https://getaipm.com/favicon.svg'
      />
    </Head>
  );
};

export default SEOMeta;
