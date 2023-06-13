
export function useDropZoneHandlers(data: any, dispatch: (...args: any) => any) {
    const handleDragEnter = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
    };

    const handleDragLeave = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        event.dataTransfer.dropEffect = "copy";
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        let files = [...event.dataTransfer.files];

        if (files && files.length > 0) {
            const existingFiles = data.fileList.map((file: File) => file.name);

            files = files.filter((f) => !existingFiles.includes(f.name));

            dispatch({ type: "ADD_FILE_TO_LIST", files });
            dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
        }
    };

    const handleFileSelect = (event: any) => {
        let files = [...event.target.files];

        if (files && files.length > 0) {
            const existingFiles = data.fileList.map((file: File) => file.name);

            files = files.filter((f) => !existingFiles.includes(f.name));

            dispatch({ type: "ADD_FILE_TO_LIST", files });
        }
    };

    const uploadFiles = async () => {
        let files = data.fileList;

        const formData = new FormData();

        files.forEach((file: File) => formData.append("files", file));

        const response = await fetch("/api/docs/upload-files", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Files uploaded successfully");
        } else {
            alert("Error uploading files");
        }
    };

    return { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleFileSelect, uploadFiles }
}

