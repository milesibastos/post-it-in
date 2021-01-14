/* eslint-disable require-jsdoc */

import axios from "axios";
import {get} from "lodash";
import {Request, Response} from "express";

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

export default async (req: Request, resp: Response) => {
  const {code} = req.query;

  // Exchange Authorization Code for an Access Token
  // https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context#step-3-exchange-authorization-code-for-an-access-token
  const {data} = await axios.post("https://www.linkedin.com/oauth/v2/accessToken", {...payload, code}, config);
  const {access_token /* , expires_in */} = data;
  const profile = await fetchProfile(access_token);


  resp.send(data);
  console.debug({data, profile});
};

// Retrieving Member Profiles
// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin#retrieving-member-profiles
async function fetchProfile(token:string) {
  const authorization = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };

  const {data: profile} = await axios.get(
      "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",
      authorization
  );
  const {data: emailAddress} = await axios.get(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
      authorization
  );

  const email = get(emailAddress, "elements[0].['handle~'].emailAddress");
  const {id, localizedFirstName, localizedLastName} = profile;
  const photoURL = get(profile, "profilePicture['displayImage~'].elements[0].identifiers[0].identifier");
  const displayName = `${localizedFirstName} ${localizedLastName}`;

  return {id, email, displayName, photoURL};
}
