// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import styles from './Modal.module.css';

// const Modal = ({ image, onClose }) => {
//   useEffect(() => {
//     const lightbox = new SimpleLightbox('.Overlay', {
//       captionsData: 'alt',
//     });

//     const handleKeyDown = (event) => {
//       if (event.code === 'Escape') {
//         onClose();
//       }
//     };

//     lightbox.on('shown.simplelightbox', () => {
//       window.addEventListener('keydown', handleKeyDown);
//     });

//     lightbox.on('closed.simplelightbox', () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     });

//     return () => {
//       lightbox.destroy();
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onClose]);

//   const handleBackdropClick = (event) => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div className={styles.Overlay} onClick={handleBackdropClick}>
//       <div className={styles.Modal}>
//         <img src={image.largeImageURL} alt={image.tags} />
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   image: PropTypes.object.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;



import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
