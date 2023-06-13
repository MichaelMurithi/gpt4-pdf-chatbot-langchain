import Head from "next/head";
import DropZone from "../components/DropZone";
import styles from "../styles/Home.module.css";

export default function Documents() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Documents upload</title>
        <meta name="description" content="Chatdocs drag and drop documents upload" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Upload your documents here</h1>
        <DropZone />
      </main>

      <footer className={styles.footer}>
        <div>{new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}