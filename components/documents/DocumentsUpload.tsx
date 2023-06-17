import { useOverlay } from '@/contexts/OverlayContext';
import { Dialog } from 'primereact/dialog';
import DropZone from './DropZone';

const DocumentsUpload = () => {
	const { documentsUploadVisible, setDocumentsUploadVisible } = useOverlay();

	return (
		<Dialog
			className='text-center'
			header='Upload documents'
			visible={documentsUploadVisible}
			onHide={() => setDocumentsUploadVisible(false)}
			style={{ width: '50vw' }}
			position='top'
			breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
			<DropZone />
		</Dialog>
	);
};

export default DocumentsUpload;
