export interface NavbarProps {
    visible: boolean,
    toggleVisibility: (visible: boolean) => void
}

export interface LayoutProps {
    children?: React.ReactNode;
}