import { useEffect } from 'react';
import { Button } from './Button/Button';
import { Gallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { apiQuery } from './api';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ScrollToTop from 'react-scroll-to-top';
import { useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const noParams = () => toast.error('Please enter search parameters!');
  const noImgs = () => toast.error('No images were found for your request');
  const error404 = () => toast.error("Error happened. let's try later");

  useEffect(() => {
    if (!query) return;
    async function getImages() {
      const queryOnRequest = query.slice(query.indexOf('/') + 1);
      if (queryOnRequest === '') {
        noParams();
        return;
      }
      setLoading(true);
      try {
        let response = await apiQuery(queryOnRequest, page);
        if (response.hits.length === 0) {
          noImgs();
        }
        setImages(prevState => [...prevState, ...response.hits]);
        setLoadMore(page < Math.ceil(response.totalHits / 12));
        setLoading(false);
      } catch (error) {
        error404();
        console.log(error);
      }
    }
    getImages();
  }, [query, page]);

  const changeQuery = query => {
    setQuery(`${Date.now()}/${query}`);
    setImages([]);
    setPage(1);
  };

  const handleLoadMoreButton = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar changeQuery={changeQuery} />
      <Layout>
        {loading ? <Loader /> : <Gallery images={images} />}
        {!loadMore ? (
          <></>
        ) : (
          <Button handleLoadMoreButton={handleLoadMoreButton} />
        )}
        <Toaster position="top-left" reverseOrder={false} />
        <div style={{ marginTop: '30vh' }} />
        <ScrollToTop smooth />
      </Layout>
    </>
  );
};
