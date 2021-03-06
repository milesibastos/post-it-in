import admin from "firebase-admin";
import * as functions from "firebase-functions";
import linkedinHandler from "./linkedin";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const linkedin = functions.https.onRequest(linkedinHandler);
