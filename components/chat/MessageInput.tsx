import { useChat } from '@/contexts/ChatContext';
import styles from '@/styles/Home.module.css';
import { useSession } from 'next-auth/react';
import LoadingDots from './LoadingDots';

const MessageInput = () => {
	const {
		loading,
		textAreaRef,
		query,
		setQuery,
		handleEnter,
		handleSubmit,
	} = useChat();
	const { data: session } = useSession();

	return (
		<div className={styles.center}>
			<div className={styles.cloudform}>
				<form onSubmit={handleSubmit}>
					<textarea
						disabled={loading}
						onKeyDown={handleEnter}
						ref={textAreaRef}
						autoFocus={false}
						rows={1}
						maxLength={512}
						id='userInput'
						name='userInput'
						placeholder={
							loading
								? 'Waiting for response...'
								: `${
										session!.user!.name?.split(' ')[0]
								  }, what would you like to know?`
						}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className={styles.textarea}
					/>
					<button
						type='submit'
						disabled={loading}
						className={styles.generatebutton}>
						{loading ? (
							<div className={styles.loadingwheel}>
								<LoadingDots color='#000' />
							</div>
						) : (
							// Send icon SVG in input field
							<svg
								viewBox='0 0 20 20'
								className={styles.svgicon}
								xmlns='http://www.w3.org/2000/svg'>
								<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
							</svg>
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessageInput;
