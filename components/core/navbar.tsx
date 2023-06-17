import { useOverlay } from '@/contexts/OverlayContext';
import { useSession } from 'next-auth/react';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import DocumentsList from '../documents/DocumentsList';

const Navbar = () => {
	const { data } = useSession();
	const {
		sideBarVisible,
		setSibeBarVisible,
		setDocumentsUploadVisible,
	} = useOverlay();

	return (
		<Sidebar
			visible={sideBarVisible}
			onHide={() => setSibeBarVisible(false)}
			closeOnEscape={true}>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row'>
					<Avatar
						image={data!.user!.image ?? ''}
						shape='circle'
						aria-label='User'
						size='normal'
					/>
					<p className='ml-2 mt-1'>{data!.user!.name}</p>
				</div>
				<div className='flex flex-row'>
					<i className='mt-1 m-0 pi pi-cog' aria-label='Settings' />
					<i
						className='mt-1 ml-2 m-0 pi pi-angle-left'
						aria-label='Settings'
						onClick={() => setSibeBarVisible(false)}
					/>
				</div>
			</div>
			<div className='mt-8'>
				<div className='flex flex-row justify-between'>
					<h2 className='font-bold'>My documents</h2>
					<i
						className='m-0 pi pi-cloud-upload'
						aria-label='Upload documents'
						onClick={() => setDocumentsUploadVisible(true)}
					/>
				</div>
				<DocumentsList />
			</div>
		</Sidebar>
	);
};

export default Navbar;
