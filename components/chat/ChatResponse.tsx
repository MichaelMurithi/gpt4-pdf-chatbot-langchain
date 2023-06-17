/* eslint-disable @next/next/no-img-element */
import { ChatContext } from '@/pages/chat';
import styles from '@/styles/Home.module.css';
import { Message } from '@/types/chat';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import TypewriterComponent from 'typewriter-effect';
import SourcesList from './SourcesList';

const ChatResponse = ({
	message,
	index,
}: {
	message: Message;
	index: number;
}) => {
	const { messages, loading } = useContext(ChatContext);
	let icon;
	let className;

	if (message.type === 'apiMessage') {
		icon = (
			<img
				key={`message-${index}`}
				src='/bot-image.png'
				alt='AI'
				width='40'
				height='40'
				className={styles.boticon}
			/>
		);
		className = styles.apimessage;
	} else {
		icon = (
			<img
				key={`usericon-${index}`}
				src='/usericon.png'
				alt='Me'
				width='30'
				height='30'
				className={styles.usericon}
			/>
		);

		// The latest message sent by the user will be animated while waiting for a response
		className =
			loading && index === messages.length - 1
				? styles.usermessagewaiting
				: styles.usermessage;
	}

	return (
		<>
			<div key={`chatMessage-${index}`} className={className}>
				{icon}
				<div className={styles.markdownanswer}>
					{message.type === 'apiMessage' ? (
						<TypewriterComponent
							onInit={(typewriter) => {
								typewriter
									.typeString(message.message)
									.changeDelay(1)
									.callFunction(() => {
										document.querySelector('.Typewriter__cursor')?.remove();
									})
									.start();
							}}
						/>
					) : (
						<ReactMarkdown>{message.message}</ReactMarkdown>
					)}
				</div>
			</div>
			{message.sourceDocs && (
				<SourcesList
					sourceDocs={message.sourceDocs}
					key={`messageSource-${index}`}
				/>
			)}
		</>
	);
};

export default ChatResponse;
