import Footer from '@/components/chat/Footer';
import Overlays from '@/components/core/Overlays';
import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import Chat from './chat';

export default function Home() {
	const router = useRouter();

	const renderPage = () => {
		switch (router.pathname) {
			case '/':
				return <Chat />;
			default:
				return;
		}
	};
	return (
		<Layout>
			{renderPage()}
			<Overlays />
			<Footer />
		</Layout>
	);
}
