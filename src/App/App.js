import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { getPictures } from '../servises/pixabayService';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/Loader/Loader';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import Scroll from '../helpers/Scroll';
import NoFoundImage from '../components/ImageErr/ImageErr';
import './App.css';

export default function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState({});

  useEffect(() => {
    if (!searchQuery) return;
    setLoading(true);

    const searchImages = async () => {
      try {
        const images = await getPictures(searchQuery, page);
        setImages(prevImage => [...prevImage, ...images]);
        if (page !== 1) {
          Scroll();
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    searchImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClickLargeImage = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  const handleLoadMoreClick = () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />

      {loading && <Loader />}
      {images.length !== 0 ? (
        <ImageGallery images={images} onOpenModal={onClickLargeImage} />
      ) : (
        searchQuery !== '' && <NoFoundImage />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img
            src={largeImage.largeImageURL}
            alt={largeImage.tag}
            id={largeImage.id}
          />
          <button type="button" onClick={toggleModal}>
            Close
          </button>
        </Modal>
      )}
      {!loading && images[0] && <Button onClick={handleLoadMoreClick} />}
      <ToastContainer
        autoClose={3000}
        position="top-center"
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
