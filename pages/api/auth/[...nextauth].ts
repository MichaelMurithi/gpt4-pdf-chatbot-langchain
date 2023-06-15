import { GOOGLE_DRIVE_SCOPES } from '@/lib/google-drive-helper';
import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: `openid email profile ${GOOGLE_DRIVE_SCOPES.join(' ')}`
                }
            }
        }),
    ],
    session: {
        strategy: 'jwt' as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }: any) {
            session.user.id = token.id;
            session.user.token = token.accessToken;

            return session;
        },
        async jwt({ token, user, account }: any) {
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