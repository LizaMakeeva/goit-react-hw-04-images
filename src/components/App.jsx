import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchQuizzes } from './api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
const localStorageKey = 'quiz-query';
const perPage = 12;

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHitsStatus, setTotalHitsStatus] = useState(false);

  useEffect(() => {
    const savedQuery = localStorage.getItem(localStorageKey);
    if (savedQuery !== null) {
      setQuery(JSON.parse(savedQuery));
    }
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }
    async function getPhotos() {
      try {
        setLoading(true);
        const quizItems = await fetchQuizzes(query, page);
        const pagesCount = Math.ceil(quizItems.totalHits / perPage);
        const status = pagesCount !== page;
        setImages(prevImage => [...prevImage, ...quizItems.hits]);
        setLoading(false);
        setTotalHitsStatus(status);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getPhotos();
  }, [page, query]);

  const changeQuery = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setLoading(false);
    setPage(1);
    localStorage.setItem(localStorageKey, JSON.stringify(newQuery));
  };

  const pageUp = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <>
      <Searchbar submitForm={changeQuery} />
      <ImageGallery arrayImages={images} />
      {loading && <Loader />}
      {totalHitsStatus && images.length !== 0 && <Button onClick={pageUp} />}
    </>
  );
};
