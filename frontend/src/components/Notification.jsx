import { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const Notification = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const baseClasses = `flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-l-4 max-w-md w-full text-sm font-medium transition-all duration-300 animate-slide-down`;
  const typeClasses = type === 'success'
    ? 'bg-green-900/80 text-green-300 border-green-500'
    : 'bg-red-900/80 text-red-300 border-red-500';

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className={`${baseClasses} ${typeClasses}`}>
        <div>
          {type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
        </div>
        <p className="flex-1">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
