/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';
import Text from '../text';

const Modal = (props) => {
  const { transitionIn = true, view, handleClose, title, maxWidth, show } = props;
  const modalWrapperClass = transitionIn ? `${styles.modal} ${styles.transition}` : styles.modal;
  const modalContainerClass = transitionIn
    ? `${styles.container} ${styles.transition}`
    : styles.container;

  if (!show) {
    return null;
  } else {
    return ReactDOM.createPortal(
      <div className={modalWrapperClass}>
        <div className={modalContainerClass} style={{ maxWidth: maxWidth ? maxWidth : null }}>
          <div className={styles.content}>
            <Text kind="h2" size={28} center padded>
              {title}
            </Text>
            {view}
          </div>

          <button className={styles.close} onClick={handleClose}>
            <img src="/static/images/cancel.png" alt="Cancel" />
          </button>
        </div>

        <div className={styles.dimmer} onClick={handleClose} />
      </div>,
      document.getElementById('modal-root')
    );
  }
};

export default Modal;
