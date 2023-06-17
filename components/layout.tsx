import { Button } from 'primereact/button';
import { useState } from "react";
import Navbar from "./core/navbar";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sideBarVisible, setSibeBarVisible] = useState(false);

  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="h-16 border-b border-b-slate-200 py-4">
        <Button className="ml-4 pl-6" icon="pi pi-bars" aria-label="Navbar" text onClick={() => setSibeBarVisible(true)}/>
        </div>
      </header>
      <div className='flex'>
        <Navbar visible={ sideBarVisible} toggleVisibility={(v) => setSibeBarVisible(v)}/>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
