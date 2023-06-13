import { config } from 'dotenv';
import NextAuth, { SessionStrategy } from 'next-auth';
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
};

export default NextAuth(authOptions);