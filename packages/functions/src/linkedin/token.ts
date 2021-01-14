/* eslint-disable require-jsdoc */

import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const payload = {
  "grant_type": "authorization_code",
  "redirect_uri": process.env.REDIRECT_URI,
  "client_id": process.env.CLIENT_ID,
  "client_secret": process.env.CLIENT_SECRET,
};

// Exchange Authorization Code for an Access Token
// https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context#step-3-exchange-authorization-code-for-an-access-token
export default async function token(code:string) {
  const {data} = await axios.post<{access_token: string, expires_in: number}>("https://www.linkedin.com/oauth/v2/accessToken", {...payload, code}, config);
  return data;
}
