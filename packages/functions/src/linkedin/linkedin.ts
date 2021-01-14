/* eslint-disable require-jsdoc */

import {Request, Response} from "express";
import fetchProfile from "./profile";
import fetchToken from "./token";

export default async (req: Request, resp: Response) => {
  const {code} = req.query;

  const {access_token} = await fetchToken(code as string);
  const profile = await fetchProfile(access_token);

  resp.send(profile);
  // console.debug({profile});
};
