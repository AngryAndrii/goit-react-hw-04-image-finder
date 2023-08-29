import { StyledForm } from './Searchbar.styled';
import { useState } from 'react';

export const Searchbar = ({ changeQuery }) => {
  const [inputValue, setinputValue] = useState('');

  const handleChangeInput = event => {
    const value = event.target.value;
    setinputValue(value);
  };

  const makeQuery = event => {
    event.preventDefault();
    changeQuery(inputValue);
  };

  return (
    <StyledForm onSubmit={makeQuery}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleChangeInput}
      />
      <button type="submit">
        <span>Search</span>
      </button>
    </StyledForm>
  );
};
