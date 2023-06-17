import ChatResponse from '@/components/chat/ChatResponse';
import MessageInput from '@/components/chat/MessageInput';
import { useChat } from '@/contexts/ChatContext';
import styles from '@/styles/Home.module.css';

export default function Chat() {
	const chatContext = useChat();
	const { messageListRef, messages, error } = chatContext;

	return (
		<div className='dark mx-auto flex flex-col gap-4'>
			<main className={styles.main}>
				<div className={styles.cloud}>
					<div ref={messageListRef} className={styles.messagelist}>
						{messages.map((message, index) => {
							return (
								<ChatResponse
									key={`chatResponse-${index}`}
									message={message}
									index={index}
								/>
							);
						})}
					</div>
				</div>
				<MessageInput />
				{error && (
					<div className='border border-red-400 rounded-md p-4'>
						<p className='text-red-500'>{error}</p>
					</div>
				)}
			</main>
		</div>
	);
}
