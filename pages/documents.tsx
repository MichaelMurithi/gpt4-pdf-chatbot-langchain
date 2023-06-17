import DropZone from '@/components/documents/DropZone';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';

export default function Documents() {
	const [visible, setVisible] = useState(false);

	return (
		<div className='card flex justify-content-center'>
			<Button
				label='Show'
				icon='pi pi-external-link'
				onClick={() => setVisible(true)}
			/>
			<Dialog
				header='Header'
				visible={visible}
				onHide={() => setVisible(false)}
				style={{ width: '50vw' }}
				position='top'
				breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
				<DropZone />
			</Dialog>
		</div>
	);
}
