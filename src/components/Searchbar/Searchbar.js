import { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  //   const [image, setImage] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Search images and photos', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (searchQuery === 'error') {
      toast.error('No match...', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={s.SearchForm__input}
            type="text"
            autoComplete="off"
            value={searchQuery}
            onChange={handleChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};
