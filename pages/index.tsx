import Footer from '@/components/chat/Footer';
import Overlays from '@/components/core/Overlays';
import Layout from '@/components/layout';
import Chat from './chat';

export default function Home() {
	return (
		<Layout>
			<Chat />
			<Overlays />
			<Footer />
		</Layout>
	);
}
