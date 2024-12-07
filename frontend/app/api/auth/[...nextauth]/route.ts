import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const NEXT_AUTH_OPTIONS = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "123456",
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        return {
          id: "",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  // async session({ session, token, user }: any) {
  // Send properties to the client, like an access_token and user id from a provider.
  // session.accessToken = token.accessToken
  // session.user.id = token.id
  // session.what = "random";
  // console.log(session);
  // console.log(token);
  // console.log(user);

  // return session;
  // },
  // },
};

const handler = NextAuth(NEXT_AUTH_OPTIONS);

export const GET = handler;
export const POST = handler;
