import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function FileListButton() {
  const [files, setFiles] = useState([]);
  const { data: session } = useSession();

  return (
    <div>
      <button>List Files</button></div>
  );
};