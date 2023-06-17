import React, { createContext, useState } from 'react';

interface OverlayContextValue {
	documentsUploadVisible: boolean;
	setDocumentsUploadVisible: (v: boolean) => void;
	sideBarVisible: boolean;
	setSibeBarVisible: (v: boolean) => void;
}

const OverlayContext = createContext<OverlayContextValue | undefined>(
	undefined
);

export const OverlayProvider: React.FC = ({ children }: any) => {
	const [documentsUploadVisible, setDocumentsUploadVisibility] = useState(
		false
	);
	const [sideBarVisible, setSibeBarVisible] = useState(false);

	const setDocumentsUploadVisible = (state: boolean) => {
		setSibeBarVisible(false);
		setDocumentsUploadVisibility(state);
	};

	const contextValue: OverlayContextValue = {
		documentsUploadVisible,
		setDocumentsUploadVisible,
		sideBarVisible,
		setSibeBarVisible,
	};

	return (
		<OverlayContext.Provider value={contextValue}>
			{children}
		</OverlayContext.Provider>
	);
};

export const useOverlay = (): OverlayContextValue => {
	const overlayContext = React.useContext(OverlayContext);

	if (!overlayContext) {
		throw new Error('useOverlay must be used within an overlay provider');
	}

	return overlayContext;
};
