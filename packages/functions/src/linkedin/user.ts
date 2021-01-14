/* eslint-disable require-jsdoc */
import admin from "firebase-admin";

type User = {
  email: string;
  displayName?: string;
  photoURL?: string;
}

export default async function createCustomToken({email, displayName, photoURL}: User) {
  const auth = admin.auth();
  let user = await auth.getUserByEmail(email).catch(() => null);

  if (!user) {
    user = await auth.createUser({
      email,
      displayName,
      photoURL,
      emailVerified: true,
    });
  }

  const token = auth.createCustomToken(user.uid);
  return token;
}
