import styles from "../styles/Documents.module.css";
import DropZone from "./DropZone";

const DocumentsUpload = () => {
  return (
      <div>
        <h1 className={styles.title}>Upload your documents here</h1>
        <DropZone />
    </div>
  )
}

export default DocumentsUpload