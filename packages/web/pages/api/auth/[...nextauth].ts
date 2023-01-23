import NextAuth from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID as string,
      clientSecret: process.env.OKTA_CLIENT_SECRET as string,
      issuer: process.env.OKTA_ISSUER
    })
    // ...add more providers here
  ],
  secret: process.env.SECRET as string
};
export default NextAuth(authOptions);
