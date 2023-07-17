import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import './App.module.css';

const API_KEY = '36866998-5308da28c55e509481910204f';
const BASE_URL = 'https://pixabay.com/api/';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (searchTerm !== '') {
      setImages([]);
      setPage(1);
      fetchImages(searchTerm, 1);
    }
  }, [searchTerm]);

  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchImages(searchTerm, nextPage);
    setPage(nextPage);
  };

  const fetchImages = (query, page) => {
    setIsLoading(true);

    axios
      .get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {selectedImage && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
