// src/components/Popup.tsx
import { useState, useEffect } from 'react';

interface Props {
  id: string;
  title: string;
  content: string;
}

export default function Popup({ id, title, content }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Comprobar sesión
    const hasBeenDismissed = sessionStorage.getItem(`popup_dismissed_${id}`);
    if (!hasBeenDismissed) {
      setIsOpen(true);
    }
  }, [id]);

  const handleClose = () => {
    sessionStorage.setItem(`popup_dismissed_${id}`, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-2xl text-black">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black font-bold text-2xl"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <div 
          className="prose max-h-full overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </div>
    </div>
  );
}