import { config } from 'dotenv';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

config();

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
        }),
    ],
});
