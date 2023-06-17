import { Document } from 'langchain/document';
import { Dispatch, RefObject, SetStateAction } from 'react';

export type Message = {
  type: 'apiMessage' | 'userMessage';
  message: string;
  isStreaming?: boolean;
  sourceDocs?: Document[];
};

export interface ChatContextProps {
  loading: boolean;
  error: string | null;
  messages: Message[];
  textAreaRef: RefObject<HTMLTextAreaElement>;
  messageListRef: RefObject<HTMLDivElement>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleEnter: (event: any) => void;
  handleSubmit: (event: any) => void;
}