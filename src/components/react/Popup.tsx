import { useState, useEffect } from 'react';

interface Props {
  id: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  linkUrl?: string;
  ctaText?: string;
  frequency?: 'always' | 'once_user' | 'once_per_session' | 'once_per_day' | string;
}

export default function Popup({ 
  id, 
  title, 
  content, 
  imageUrl, 
  linkUrl, 
  ctaText, 
  frequency = 'always' 
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Si la frecuencia es "once_user" o "once_per_session", valida sessionStorage
    if (frequency === 'once_user' || frequency === 'once_per_session') {
      const isDismissed = sessionStorage.getItem(`popup_dismissed_${id}`);
      if (!isDismissed) setIsOpen(true);
      return;
    }

    if (frequency === 'once_per_day') {
      const lastDismissed = localStorage.getItem(`popup_dismissed_${id}`);
      if (!lastDismissed) {
        setIsOpen(true);
      } else {
        const hoursPassed = (new Date().getTime() - new Date(lastDismissed).getTime()) / (1000 * 60 * 60);
        if (hoursPassed >= 24) setIsOpen(true);
      }
      return;
    }

    // Si es "always"
    setIsOpen(true);
  }, [id, frequency]);

  const handleClose = () => {
    if (frequency === 'once_user' || frequency === 'once_per_session') {
      sessionStorage.setItem(`popup_dismissed_${id}`, 'true');
    } else if (frequency === 'once_per_day') {
      localStorage.setItem(`popup_dismissed_${id}`, new Date().toISOString());
    } else {
      sessionStorage.setItem(`popup_dismissed_${id}`, 'true');
    }

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-2xl text-black flex flex-col items-center">
        <button 
          onClick={handleClose}
          className="absolute top-2 right-4 text-gray-400 hover:text-black font-bold text-3xl transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        {title && <h2 className="text-2xl font-bold mb-3 text-center">{title}</h2>}

        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title || 'Popup'} 
            className="w-full max-h-[70vh] object-contain rounded-lg mb-4" 
          />
        )}

        {content && (
          <div 
            className="prose max-h-48 overflow-y-auto mb-4 w-full text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        )}

        {linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors w-full text-center"
          >
            {ctaText || 'Más información'}
          </a>
        )}
      </div>
    </div>
  );
}