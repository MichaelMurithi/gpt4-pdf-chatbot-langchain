import '@/styles/base.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import Auth from '../components/auth/auth';
import '../styles/documents.globals.css';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<main className={inter.variable}>
				<Auth>
					<Component {...pageProps} />
				</Auth>
			</main>
		</SessionProvider>
	);
}

export default MyApp;
