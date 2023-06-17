
import { NavbarProps } from '@/types/layout';
import { Sidebar } from 'primereact/sidebar';

const Navbar = ({ visible, toggleVisibility }: NavbarProps) => {
    return (
        <Sidebar
            visible={visible}
            onHide={() => toggleVisibility(false)}
            closeIcon="pi pi-angle-left"
            closeOnEscape={true}
        >
          <h2>Sidebar</h2>
    </Sidebar>
  )
}

export default Navbar;