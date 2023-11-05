import { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import toast, { Toaster } from 'react-hot-toast';
import fetchImages from 'services/api';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

const App = () => {
  const [query, setQuery] = useState('');
  const [previousQuery, setPreviousQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const perPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resp = await fetchImages(query, page);
        if (resp.hits.length === 0) {
          setError(true);
          toast.error('Sorry, there are no images matching your search query.');
        }
        const newImages = resp.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        setImages(prevState => [...prevState, ...newImages]);
        smoothScroll();

        if (resp.totalHits !== 0 && page === 1) {
          toast.success(`Hooray! We found ${resp.totalHits} images!`);
        }
        const totalPage = Math.ceil(resp.totalHits / perPage);

        if (totalPage > page) {
          setBtnLoadMore(true);
        } else if (totalPage === page && resp.totalHits) {
          toast.error("Sorry, but you've reached the end of search results.", {
            style: {
              background: 'rgb(247 246 184)',
            },
          });
          setBtnLoadMore(false);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '' || page !== 1) {
      fetchData();
    }
  }, [query, page]);

  const handleSubmit = (newQuery) => {
    if (newQuery === '') {
      toast.error('Enter your request');
      return;
    }

    if (newQuery === previousQuery) {
      toast.error('Sorry you just searched these photos!');
      return;
    }

    setQuery(newQuery);
    setPreviousQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(false);
    setBtnLoadMore(false);
  };

  const handleLoadMore = () => {
    setLoading(true);

    setPage(prevPage => prevPage + 1);
    smoothScroll();
  };

  const smoothScroll = () => {
    window.scrollBy({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
        gap: '16px',
        margin: '0 auto',
        paddingBottom: '24px',
      }}
    >
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {btnLoadMore && <Button onClick={handleLoadMore} />}
      {error && (
        <p style={{ fontSize: '20px', color: 'rgb(239 68 68)' }}>
          Whoops! Error! Please reload this page!
        </p>
      )}
      <Toaster
        autoClose={1000}
        position="top-center"
        containerClassName="text-xs"
        toastOptions={{
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            fontSize: '20px',
          },
          success: {
            style: {
              background: 'rgb(134 184 206)',
            },
          },
          error: {
            style: {
              background: 'rgb(237 191 77)',
            },
          },
        }}
        containerStyle={{
          top: 80,
        }}
      />
    </div>
  );
};

export default App;
