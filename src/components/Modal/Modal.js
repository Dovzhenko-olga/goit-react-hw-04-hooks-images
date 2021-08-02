import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({onClose, children}) {

  const handleKeyDown = e => {
       if (e.code === 'Escape') {
         onClose();
       }
   }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return (
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        {children}
      </div>
    </div>
  );
  }