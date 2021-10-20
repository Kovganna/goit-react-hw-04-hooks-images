import { Component } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
class Searchbar extends Component {
  state = {
    images: [],
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
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
    if (this.state.searchQuery === 'error') {
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

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <>
        <header className={s.Searchbar}>
          <form className={s.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.SearchForm__button}>
              <span className={s.SearchForm__buttonLabel}>Search</span>
            </button>

            <input
              className={s.SearchForm__input}
              type="text"
              autoComplete="off"
              value={searchQuery}
              onChange={this.handleChange}
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};

export default Searchbar;
