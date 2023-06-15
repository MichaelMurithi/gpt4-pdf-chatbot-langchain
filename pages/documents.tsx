import Head from "next/head";
import styles from "../styles/Documents.module.css";

export default function Documents() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Documents upload</title>
        <meta name="description" content="Chatdocs drag and drop documents upload" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Documents upload page</p>
      </main>

      <footer className={styles.footer}>
        <div>{new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}