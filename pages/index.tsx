import ChatResponse from '@/components/chat/ChatResponse';
import Footer from '@/components/chat/Footer';
import MessageInput from '@/components/chat/MessageInput';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';
import useChat from '@/utils/use-chat';

export default function Home() {
  const { error, messages, messageListRef } = useChat();

  return (
      <Layout>
        <div className="dark mx-auto flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
            Chat with your docs
          </h1>
          <main className={styles.main}>
            <div className={styles.cloud}>
              <div ref={messageListRef} className={styles.messagelist}>
              {
                messages.map((message, index) => {
                  return <ChatResponse key={`chatResponse-${index}`} message={message} index={index}/>
                })
              }
              </div>
            </div>
            <MessageInput/>
            { error && (
              <div className="border border-red-400 rounded-md p-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </main>
        </div>
      <Footer/>
    </Layout>
  );
}
