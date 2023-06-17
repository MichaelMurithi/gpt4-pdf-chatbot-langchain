import { FileUploadFilesEvent } from "primereact/fileupload";
import { useRef, useState } from "react";

export default function useDropZone() {
    const toast = useRef<any>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<any>(null);

    const onTemplateSelect = (e: FileUploadFilesEvent) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key: any) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: FileUploadFilesEvent) => {
        let _totalSize = 0;

        e.files.forEach((file: File) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current!.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
        });
    };

    const onTemplateRemove = (file: File, callback: VoidFunction) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const extensionToMimetypeMap: Record<string, string> = {
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.md': 'text/markdown',
        '.csv': 'text/csv',
        '.txt': 'text/plain',
        '.docm': 'application/vnd.ms-word.document.macroEnabled.12',
        '.dotm': 'application/vnd.ms-word.template.macroEnabled.12',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    };

    const generateAcceptString = () => {
        const extensions = Object.keys(extensionToMimetypeMap);

        return extensions.map((extension) => `${extensionToMimetypeMap[extension]},${extension}`).join(',');
    };

    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined',
    };
    const uploadOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        iconOnly: true,
        className:
            'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
    };
    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
        className:
            'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
    };

    return { totalSize, fileUploadRef, onTemplateRemove, toast, onTemplateUpload, onTemplateSelect, onTemplateClear, generateAcceptString, chooseOptions, uploadOptions, cancelOptions }
}