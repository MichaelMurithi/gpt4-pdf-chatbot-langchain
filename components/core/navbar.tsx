import { NavbarProps } from '@/types/layout';
import { useSession } from 'next-auth/react';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import DocumentsList from '../documents/DocumentsList';

const Navbar = ({ visible, toggleVisibility }: NavbarProps) => {
	const { data } = useSession();

	return (
		<Sidebar
			visible={visible}
			onHide={() => toggleVisibility(false)}
			closeOnEscape={true}>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row'>
					<Avatar
						image={data!.user.image ?? ''}
						shape='circle'
						aria-label='User'
						size='normal'
					/>
					<p className='ml-2 mt-1'>{data?.user.name}</p>
				</div>
				<div className='flex flex-row'>
					<i className='mt-1 m-0 pi pi-cog' aria-label='Settings' />
					<i
						className='mt-1 ml-2 m-0 pi pi-angle-left'
						aria-label='Settings'
						onClick={() => toggleVisibility(false)}
					/>
				</div>
			</div>
			<div className='mt-8'>
				<div className='flex flex-row justify-between'>
					<h2 className='font-bold'>My documents</h2>
					<i className='m-0 pi pi-cloud-upload' aria-label='Settings' />
				</div>
				<DocumentsList />
			</div>
		</Sidebar>
	);
};

export default Navbar;
