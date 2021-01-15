/* eslint-disable require-jsdoc */

import axios from "axios";
import qs from "qs";
import * as functions from "firebase-functions";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const {redirect_uri, client_id, client_secret} = functions.config().linkedin;

const payload = {
  grant_type: "authorization_code",
  redirect_uri,
  client_id,
  client_secret,
};

// Exchange Authorization Code for an Access Token
// https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context#step-3-exchange-authorization-code-for-an-access-token
export default async function token(code:string) {
  const {data} = await axios
      .post<{access_token: string, expires_in: number}>(
          "https://www.linkedin.com/oauth/v2/accessToken",
          qs.stringify({...payload, code}),
          config)
      .catch((reason) => {
        functions.logger.error(reason.toJSON());
        throw new Error(reason);
      });
  return data;
}
