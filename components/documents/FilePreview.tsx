import styles from '../../styles/FilePreview.module.css';

const FilePreview = ({ fileData }: any) => {
	return (
		<div className={styles.fileList}>
			<div className={styles.fileContainer}>
				{fileData.fileList.map((file: File) => {
					return (
						<ol key={file.lastModified}>
							<li className={styles.fileList}>
								<div key={file.name} className={styles.fileName}>
									{file.name}
								</div>
							</li>
						</ol>
					);
				})}
			</div>
		</div>
	);
};

export default FilePreview;
