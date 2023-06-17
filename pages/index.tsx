import Footer from '@/components/chat/Footer';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import Chat from './chat';
import Documents from './documents';

export default function Home() {
	const router = useRouter();

	const renderPage = () => {
		switch (router.pathname) {
			case '/s':
				return <Chat />;
			case '/':
				return <Documents />;
			default:
				return <div>Page Not Found</div>;
		}
	};
	return (
		<Layout>
			{renderPage()}
			<Footer />
		</Layout>
	);
}
