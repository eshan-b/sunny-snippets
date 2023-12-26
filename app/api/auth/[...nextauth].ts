import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

export const authOptions = {
  // secret for JWT
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],

  adapter: FirestoreAdapter({
    credential: getAuth(app) as any,
  }),
};

export default NextAuth(authOptions);
function cert(arg0: {}): import("firebase-admin/app").Credential | undefined {
  throw new Error("Function not implemented.");
}
