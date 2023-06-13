import { config } from 'dotenv';
import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

config();

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }: any) {
            session.user.id = token.id;
            session.user.token = token.accessToken;

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }: any) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
                console.log(account.access_token)
            }
            return token;
        },
    },
};

export default NextAuth(authOptions as unknown as AuthOptions);