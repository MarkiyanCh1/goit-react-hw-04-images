import React from 'react';
import { FcSearch } from 'react-icons/fc';
import { Header, Form, Button, Input } from './Searchbar.styles';
import { useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleFormSubmit}>
        <Button>
          <span>
            <FcSearch size="23" />
          </span>
        </Button>

        <Input
          type="text"
          name="search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          placeholder="Enter a search query"
        />
      </Form>
    </Header>
  );
};

export default SearchBar;
