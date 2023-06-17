import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';
import { ChatProvider } from './ChatContext';
import { OverlayProvider } from './OverlayContext';

const combineContexts = (
	...providers: FC<{ children: ReactNode }>[]
): FC<{ children: ReactNode }> => {
	const CombinedProvider: FC<{ children: ReactNode }> = ({ children }) => {
		return providers.reduceRight((acc, Provider) => {
			return <Provider>{acc}</Provider>;
		}, <>{children}</>);
	};

	return CombinedProvider;
};

export const AppContext = combineContexts(
	ChatProvider,
	OverlayProvider,
	SessionProvider
);
