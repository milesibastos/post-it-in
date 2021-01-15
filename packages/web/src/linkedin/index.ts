const url = new URL('https://www.linkedin.com/oauth/v2/authorization');
url.searchParams.set('response_type', 'code');
url.searchParams.set(
  'client_id',
  process.env.REACT_APP_LINKEDIN_CLIENT_ID || ''
);
url.searchParams.set(
  'redirect_uri',
  process.env.REACT_APP_LINKEDIN_REDIRECT_URI || ''
);
url.searchParams.set('scope', 'r_liteprofile r_emailaddress');

export const authorization = url;