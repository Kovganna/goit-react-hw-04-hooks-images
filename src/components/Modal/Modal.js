import { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
