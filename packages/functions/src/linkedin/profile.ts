/* eslint-disable require-jsdoc */

import axios from "axios";
import {get} from "lodash";

// Retrieving Member Profiles
// https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin#retrieving-member-profiles
export default async function profile(token:string) {
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
