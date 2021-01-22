import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import s from './SearchBar.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchBar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Enter the title of the movie');
      return;
    }

    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <form className={s.SearchForm} onSubmit={handleSubmit}>
      <input
        className={s.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        name="searchValue"
        value={searchValue}
        onChange={handleChange}
      />

      <button type="submit" className={s.SearchFormButton}>
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
