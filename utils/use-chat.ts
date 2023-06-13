import { Message } from "@/types/chat";
import { useEffect, useRef, useState } from "react";

export default function useChat() {
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [messageState, setMessageState] = useState<{
        messages: Message[];
        pending?: string;
        history: [string, string][];
        pendingSourceDocs?: Document[];
    }>({
        messages: [
            {
                message: 'Hi, what you like to learn from the available documents?',
                type: 'apiMessage',
            },
        ],
        history: [],
    });

    useEffect(() => {
        textAreaRef.current?.focus();
    }, []);

    const { messages, history } = messageState;
    const messageListRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleEnter = (e: any) => {
        if (e.key === 'Enter' && query) {
            handleSubmit(e);
        } else if (e.key == 'Enter') {
            e.preventDefault();
        }
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        setError(null);

        if (!query) {
            alert('Please input a question');

            return;
        }

        const question = query.trim();

        setMessageState((state) => ({
            ...state,
            messages: [
                ...state.messages,
                {
                    type: 'userMessage',
                    message: question,
                },
            ],
        }));

        setLoading(true);
        setQuery('');

        try {
            await fetchAnswerAndUpdateChat(question);
            //scroll to bottom
            messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
        } catch (error) {
            handleDataFetchError(error);
        }
    }

    async function fetchAnswerAndUpdateChat(question: string) {
        const data = await fetchResponse(question);
        console.log('data', data);

        if (data.error) {
            setError(data.error);
        } else {
            setMessageState((state) => ({
                ...state,
                messages: [
                    ...state.messages,
                    {
                        type: 'apiMessage',
                        message: data.text,
                        sourceDocs: data.sourceDocuments,
                    },
                ],
                history: [...state.history, [question, data.text]],
            }));
        }

        console.log('messageState', messageState);
        setLoading(false);
    }

    async function fetchResponse(question: string) {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question,
                history,
            }),
        });

        return await response.json();
    }

    function handleDataFetchError(error: any) {
        setLoading(false);
        setError('An error occurred while fetching the data. Please try again.');
        console.log('error', error);
    }

    return { loading, error, messages, textAreaRef, messageListRef, query, setQuery, handleEnter, handleSubmit }
}