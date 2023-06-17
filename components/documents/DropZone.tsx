/* eslint-disable @next/next/no-img-element */
import { DropZoneHeaderOptions } from '@/types/documents.interface';
import useDropZone from '@/utils/use-drop-zone';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';

export default function DropZone() {
	const {
		totalSize,
		fileUploadRef,
		onTemplateRemove,
		toast,
		onTemplateUpload,
		onTemplateSelect,
		onTemplateClear,
		chooseOptions,
		uploadOptions,
		cancelOptions,
		generateAcceptString,
	} = useDropZone();

	const headerTemplate = (options: DropZoneHeaderOptions) => {
		const { className, chooseButton, uploadButton, cancelButton } = options;
		const value = totalSize / 10000;
		const formatedValue =
			fileUploadRef && fileUploadRef.current
				? fileUploadRef.current.formatSize(totalSize)
				: '0 B';

		return (
			<div
				className={className}
				style={{
					backgroundColor: 'transparent',
					display: 'flex',
					alignItems: 'center',
				}}>
				{chooseButton}
				{uploadButton}
				{cancelButton}
				<div className='flex align-items-center gap-3 ml-auto'>
					<span>{formatedValue} / 1 MB</span>
					<ProgressBar
						className='mt-1.5'
						value={value}
						showValue={false}
						style={{ width: '10rem', height: '12px' }}></ProgressBar>
				</div>
			</div>
		);
	};

	const itemTemplate = (file: any, props: any) => {
		return (
			<div className='flex items-center flex-wrap justify-between'>
				<div className='flex items-center' style={{ width: '40%' }}>
					<span className='flex text-left ml-3'>{file.name}</span>
				</div>
				<Tag
					value={props.formatSize}
					severity='warning'
					className='px-3 py-2'
				/>
				<Button
					type='button'
					icon='pi pi-times'
					className='p-button-outlined p-button-rounded p-button-danger ml-auto'
					onClick={() => onTemplateRemove(file, props.onRemove)}
				/>
			</div>
		);
	};

	const emptyTemplate = () => {
		return (
			<div className='flex items-center flex-col'>
				<i
					className='pi pi-image mt-3 p-5'
					style={{
						fontSize: '5em',
						borderRadius: '50%',
						backgroundColor: 'var(--surface-b)',
						color: 'var(--surface-d)',
					}}></i>
				<span
					style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
					className='my-5'>
					Drag and drop documents here
				</span>
			</div>
		);
	};

	return (
		<div>
			<Toast ref={toast}></Toast>

			<Tooltip target='.custom-choose-btn' content='Choose' position='bottom' />
			<Tooltip target='.custom-upload-btn' content='Upload' position='bottom' />
			<Tooltip target='.custom-cancel-btn' content='Clear' position='bottom' />

			<FileUpload
				ref={fileUploadRef}
				name='demo[]'
				url='/api/documents/upload'
				multiple
				accept={generateAcceptString()}
				maxFileSize={1000000}
				onUpload={onTemplateUpload}
				onSelect={onTemplateSelect}
				onError={onTemplateClear}
				onClear={onTemplateClear}
				headerTemplate={headerTemplate}
				itemTemplate={itemTemplate}
				emptyTemplate={emptyTemplate}
				chooseOptions={chooseOptions}
				uploadOptions={uploadOptions}
				cancelOptions={cancelOptions}
			/>
		</div>
	);
}
