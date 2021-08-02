import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from "react-loader-spinner";
import imagesApi from './services/images-api';
import Container from './components/Container';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import Button from './components/Button';
import Modal from './components/Modal';

import styles from './App.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    
    fetchImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  
  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHits([]);
  };

  const onModal = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

const toggleModal = () => {
  setShowModal(!showModal);
  };

  const fetchImages = () => {
    
  setIsLoading(true);
  
    const options = { searchQuery, currentPage };

    imagesApi.fetchImages(options)
      .then(images => {
        if (images.length === 0) {
          toast.info('Try again!', {
            className: styles.toaster
          })
        }
        setHits([...hits, ...images]);
        setCurrentPage(currentPage + 1);
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(() => {
        toast.info('Try again!', {
          className: styles.toaster
        })
      })
      .finally(() => setIsLoading(false));
  }  

  const shouldRenderLoadMoreButton = hits.length > 0 && !isLoading;

    return (
      <Container>
        
        <Searchbar onSubmit={onChangeQuery} />
        <ImageGallery hits={hits} onClick={onModal}/>
          
        {shouldRenderLoadMoreButton && <Button onClick={fetchImages} />}

        {isLoading &&
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={200}
            width={200}
            className={styles.Loader}
          />}
        
        {showModal && (<Modal onClose={toggleModal}>
           <img src={largeImageURL} alt={tags} />
        </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
