import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <>
      <img
        onClick={() => {
          openModal(image);
        }}
        src={image.webformatURL}
        alt={image.tag}
        className={s.ImageGalleryItem__image}
      />
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
