import { useDropZoneHandlers } from "@/utils/documents-upload/file-handlers";
import styles from "../styles/DropZone.module.css";
import FilePreview from "./FilePreview";

const DropZone = ({ data, dispatch }: any) => {
    const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleFileSelect, uploadFiles } = useDropZoneHandlers(data, dispatch);

    return (
        <>
          <div
            className={styles.dropzone}
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >

            <img src="/upload.svg" alt="upload" height={50} width={50} />
            <input
              id="fileSelect"
              type="file"
              multiple
              className={styles.files}
              onChange={(e) => handleFileSelect(e)}
            />
            <label htmlFor="fileSelect">You can select multiple Files</label>
            <h3 className={styles.uploadMessage}> or drag &amp; drop your files here </h3>
            </div>

          <FilePreview fileData={data} />

            {
            data.fileList.length > 0 && (
                <button className={styles.uploadBtn} onClick={uploadFiles}> Upload </button>
                )
            }
        </>
      );
};

export default DropZone;